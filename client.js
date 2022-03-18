import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_KEY)

export { supabase }