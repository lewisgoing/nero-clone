"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getRedisClient, setSessionQueue } from "@/lib/redis"

export async function createSession(formData: FormData) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Extract form data
  const name = formData.get("session-name") as string
  const description = formData.get("session-description") as string
  const sessionDate = formData.get("session-date") as string
  const sessionTime = formData.get("session-time") as string
  const durationMinutes = Number.parseInt(formData.get("session-duration") as string)
  const isPublic = formData.get("public-session") === "on"

  // Combine date and time
  const dateTime = new Date(`${sessionDate}T${sessionTime}`)

  // Create session
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert({
      creator_id: user.id,
      name,
      description,
      session_date: dateTime.toISOString(),
      duration_minutes: durationMinutes,
      is_public: isPublic,
      standard_price: 5.0, // Default values
      priority_price: 15.0,
    })
    .select()
    .single()

  if (sessionError) {
    throw new Error(`Failed to create session: ${sessionError.message}`)
  }

  // Extract submission settings
  const acceptMp3 = formData.get("mp3") === "on"
  const acceptWav = formData.get("wav") === "on"
  const acceptAiff = formData.get("aiff") === "on"
  const acceptFlac = formData.get("flac") === "on"
  const maxFileSize = Number.parseInt(formData.get("max-file-size") as string)
  const reviewTimeSeconds = Number.parseInt(formData.get("review-time") as string)
  const requireArtistName = formData.get("artist-name") === "on"
  const requireTrackTitle = formData.get("track-title") === "on"
  const requireGenre = formData.get("genre") === "on"
  const requireFeedbackRequest = formData.get("specific-feedback") === "on"
  const requireSocialLinks = formData.get("social-links") === "on"
  const allowExternalLinks = formData.get("allow-links") === "on"

  // Create session settings
  const { error: settingsError } = await supabase.from("session_settings").insert({
    session_id: session.id,
    accept_mp3: acceptMp3,
    accept_wav: acceptWav,
    accept_aiff: acceptAiff,
    accept_flac: acceptFlac,
    require_artist_name: requireArtistName,
    require_track_title: requireTrackTitle,
    require_genre: requireGenre,
    require_feedback_request: requireFeedbackRequest,
    require_social_links: requireSocialLinks,
    allow_external_links: allowExternalLinks,
  })

  if (settingsError) {
    throw new Error(`Failed to create session settings: ${settingsError.message}`)
  }

  // Extract pricing settings
  const enablePayments = formData.get("enable-payments") === "on"
  const standardPrice = Number.parseFloat(formData.get("standard-price") as string) || 0
  const enablePriority = formData.get("enable-priority") === "on"
  const priorityPrice = Number.parseFloat(formData.get("priority-price") as string) || 0

  // Update session with pricing
  const { error: pricingError } = await supabase
    .from("sessions")
    .update({
      standard_price: enablePayments ? standardPrice : 0,
      priority_price: enablePayments && enablePriority ? priorityPrice : 0,
      enable_priority: enablePriority,
      review_time_seconds: reviewTimeSeconds,
      max_file_size: maxFileSize,
    })
    .eq("id", session.id)

  if (pricingError) {
    throw new Error(`Failed to update session pricing: ${pricingError.message}`)
  }

  // Initialize empty queue in Redis
  await setSessionQueue(session.id, [])

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function getUpcomingSessions() {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  // Get upcoming sessions for the user
  const { data: sessions, error } = await supabase
    .from("sessions")
    .select(`
      id,
      name,
      description,
      session_date,
      duration_minutes,
      is_public,
      is_live,
      standard_price,
      priority_price,
      enable_priority
    `)
    .eq("creator_id", user.id)
    .gte("session_date", new Date().toISOString())
    .order("session_date", { ascending: true })

  if (error) {
    console.error("Error fetching upcoming sessions:", error)
    return []
  }

  return sessions
}

export async function getSessionSubmissions(sessionId: string) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  // Get submissions for the session
  const { data: submissions, error } = await supabase
    .from("submissions")
    .select(`
      id,
      artist_name,
      track_title,
      genre,
      feedback_request,
      social_links,
      file_url,
      external_url,
      is_priority,
      status,
      position,
      created_at,
      users (
        id,
        username,
        avatar_url
      )
    `)
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching session submissions:", error)
    return []
  }

  return submissions
}

export async function updateSessionLiveStatus(sessionId: string, isLive: boolean) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Update session live status
  const { error } = await supabase
    .from("sessions")
    .update({ is_live: isLive })
    .eq("id", sessionId)
    .eq("creator_id", user.id)

  if (error) {
    throw new Error(`Failed to update session status: ${error.message}`)
  }

  // Update Redis cache
  const redis = getRedisClient()
  await redis.set(`session:${sessionId}:live`, isLive)

  revalidatePath(`/dashboard`)
  revalidatePath(`/session/${sessionId}`)
}
