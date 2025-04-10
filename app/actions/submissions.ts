"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addToSessionQueue, removeFromSessionQueue } from "@/lib/redis"
import { getRedisClient } from "@/lib/redis"

export async function submitTrack(formData: FormData) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Extract form data
  const sessionId = formData.get("session-id") as string
  const artistName = formData.get("artist-name") as string
  const trackTitle = formData.get("track-title") as string
  const genre = formData.get("genre") as string
  const feedbackRequest = formData.get("feedback-request") as string
  const socialLinks = formData.get("social-links") as string
  const submissionType = formData.get("submission-type") as string
  const isPriority = submissionType === "priority"
  const externalUrl = formData.get("track-url") as string

  // In a real app, we would handle file uploads here
  // For now, we'll just use a placeholder URL
  const fileUrl = "/placeholder-audio.mp3"

  // Calculate payment amount based on submission type
  const paymentAmount = isPriority ? 15.0 : 5.0

  // Create submission
  const { data: submission, error } = await supabase
    .from("submissions")
    .insert({
      session_id: sessionId,
      user_id: user.id,
      artist_name: artistName,
      track_title: trackTitle,
      genre,
      feedback_request: feedbackRequest,
      social_links: socialLinks,
      is_priority: isPriority,
      file_url: fileUrl,
      external_url: externalUrl || null,
      payment_amount: paymentAmount,
      payment_status: "completed", // In a real app, this would be set after payment processing
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create submission: ${error.message}`)
  }

  // Add to Redis queue
  await addToSessionQueue(sessionId, submission.id, isPriority)

  revalidatePath(`/session/${sessionId}`)
  redirect("/submission-success")
}

export async function updateSubmissionStatus(submissionId: string, status: string, notes?: string) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Get the submission to find its session
  const { data: submission, error: fetchError } = await supabase
    .from("submissions")
    .select("session_id")
    .eq("id", submissionId)
    .single()

  if (fetchError) {
    throw new Error(`Failed to fetch submission: ${fetchError.message}`)
  }

  // Verify the user is the session creator
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("creator_id")
    .eq("id", submission.session_id)
    .single()

  if (sessionError) {
    throw new Error(`Failed to fetch session: ${sessionError.message}`)
  }

  if (session.creator_id !== user.id) {
    throw new Error("Unauthorized: You are not the creator of this session")
  }

  // Update submission status
  const updateData: any = { status }
  if (notes) {
    updateData.review_notes = notes
  }

  const { error } = await supabase.from("submissions").update(updateData).eq("id", submissionId)

  if (error) {
    throw new Error(`Failed to update submission status: ${error.message}`)
  }

  // If marked as reviewed or skipped, remove from queue
  if (status === "reviewed" || status === "skipped") {
    await removeFromSessionQueue(submission.session_id, submissionId)
  }

  revalidatePath(`/dashboard`)
  revalidatePath(`/session/${submission.session_id}`)
}

export async function reorderQueue(sessionId: string, newOrder: string[]) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Verify the user is the session creator
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("creator_id")
    .eq("id", sessionId)
    .single()

  if (sessionError) {
    throw new Error(`Failed to fetch session: ${sessionError.message}`)
  }

  if (session.creator_id !== user.id) {
    throw new Error("Unauthorized: You are not the creator of this session")
  }

  // Update Redis queue
  const redis = getRedisClient()
  await redis.set(`session:${sessionId}:queue`, JSON.stringify(newOrder))

  revalidatePath(`/dashboard`)
  revalidatePath(`/session/${sessionId}`)
}
