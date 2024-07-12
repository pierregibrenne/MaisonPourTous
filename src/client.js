
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://autheqstmjgeindgkrse.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dGhlcXN0bWpnZWluZGdrcnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3MjY0MTUsImV4cCI6MjAwNjMwMjQxNX0.1bERfsM-wKgtTBhaC5Z2vRIfob_DEMgWyA6vgmxKCow"
export const supabase = createClient(supabaseUrl, supabaseKey)
