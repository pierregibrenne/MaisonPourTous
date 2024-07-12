
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://autheqstmjgeindgkrse.supabase.co'
const supabaseKey = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
export const supabase = createClient(supabaseUrl, supabaseKey)
