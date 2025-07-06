import { createServerClient as createSSRClient, type CookieOptions } from "@supabase/ssr" // Assuming this is for the SSR client
import { cookies } from "next/headers" // Assuming this is for the SSR client
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

// Admin client for elevated privileges
let adminInstance: SupabaseClient | null = null

export function createAdminClient(): SupabaseClient {
  // Return existing instance if already created (simple singleton)
  if (adminInstance) {
    return adminInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      "CRITICAL: Supabase URL or Service Role Key is not defined in environment variables for admin client.",
    )
    // This error will be caught by the API route's try...catch
    throw new Error("Server configuration error: Supabase admin credentials missing.")
  }

  try {
    // Create and store the new instance
    adminInstance = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
    return adminInstance
  } catch (error) {
    console.error("Failed to create Supabase admin client instance:", error)
    // This error will also be caught by the API route's try...catch
    throw new Error("Failed to initialize Supabase admin client.")
  }
}

// Keep your existing createClient for SSR if it's in this file
export async function createClient() {
  // This is your SSR client
  const cookieStore = await cookies()
  return createSSRClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
        }
      },
    },
  })
}
