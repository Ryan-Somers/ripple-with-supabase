import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: users } = await supabase.auth.getUser()

  return <pre>{JSON.stringify(users, null, 2)}</pre>
}