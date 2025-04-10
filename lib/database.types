export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          full_name: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          avatar_url?: string | null
          full_name?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar_url?: string | null
          full_name?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          creator_id: string
          name: string
          description: string | null
          session_date: string
          duration_minutes: number
          is_public: boolean
          is_live: boolean
          standard_price: number
          priority_price: number
          enable_priority: boolean
          accept_submissions: boolean
          max_file_size: number
          review_time_seconds: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          name: string
          description?: string | null
          session_date: string
          duration_minutes: number
          is_public?: boolean
          is_live?: boolean
          standard_price?: number
          priority_price?: number
          enable_priority?: boolean
          accept_submissions?: boolean
          max_file_size?: number
          review_time_seconds?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          name?: string
          description?: string | null
          session_date?: string
          duration_minutes?: number
          is_public?: boolean
          is_live?: boolean
          standard_price?: number
          priority_price?: number
          enable_priority?: boolean
          accept_submissions?: boolean
          max_file_size?: number
          review_time_seconds?: number
          created_at?: string
          updated_at?: string
        }
      }
      session_settings: {
        Row: {
          id: string
          session_id: string
          accept_mp3: boolean
          accept_wav: boolean
          accept_aiff: boolean
          accept_flac: boolean
          require_artist_name: boolean
          require_track_title: boolean
          require_genre: boolean
          require_feedback_request: boolean
          require_social_links: boolean
          allow_external_links: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          accept_mp3?: boolean
          accept_wav?: boolean
          accept_aiff?: boolean
          accept_flac?: boolean
          require_artist_name?: boolean
          require_track_title?: boolean
          require_genre?: boolean
          require_feedback_request?: boolean
          require_social_links?: boolean
          allow_external_links?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          accept_mp3?: boolean
          accept_wav?: boolean
          accept_aiff?: boolean
          accept_flac?: boolean
          require_artist_name?: boolean
          require_track_title?: boolean
          require_genre?: boolean
          require_feedback_request?: boolean
          require_social_links?: boolean
          allow_external_links?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          session_id: string
          user_id: string
          artist_name: string
          track_title: string
          genre: string | null
          feedback_request: string | null
          social_links: string | null
          file_url: string | null
          external_url: string | null
          is_priority: boolean
          status: string
          position: number | null
          review_notes: string | null
          payment_id: string | null
          payment_status: string
          payment_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          artist_name: string
          track_title: string
          genre?: string | null
          feedback_request?: string | null
          social_links?: string | null
          file_url?: string | null
          external_url?: string | null
          is_priority?: boolean
          status?: string
          position?: number | null
          review_notes?: string | null
          payment_id?: string | null
          payment_status?: string
          payment_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          artist_name?: string
          track_title?: string
          genre?: string | null
          feedback_request?: string | null
          social_links?: string | null
          file_url?: string | null
          external_url?: string | null
          is_priority?: boolean
          status?: string
          position?: number | null
          review_notes?: string | null
          payment_id?: string | null
          payment_status?: string
          payment_amount?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
