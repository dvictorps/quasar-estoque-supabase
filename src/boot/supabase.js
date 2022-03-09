import { createClient } from '@supabase/supabase-js'
import userAuthUser from 'src/Composables/userAuthUser'

const supabaseURL = process.env.SUPABASE_URL
const supabaseKEY = process.env.SUPABASE_KEY
const supabase = createClient(supabaseURL, supabaseKEY)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = userAuthUser()

  user.value = session?.user || null
})

console.log('funfou', supabase)

export default function useSupabase () {
  return { supabase }
}
