import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

// Create a single supabase client for client components
let clientInstance: ReturnType<typeof createBrowserSupabaseClient> | null = null

export const createBrowserSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("key: ", supabaseKey)
  console.log("url: ", supabaseUrl)  

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}

// Use a singleton pattern to avoid multiple instances
export const getSupabaseBrowserClient = () => {
  if (!clientInstance) {
    clientInstance = createBrowserSupabaseClient()
  }
  return clientInstance
}
