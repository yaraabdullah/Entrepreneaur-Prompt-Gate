import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SignUpData {
  email: string
  phone: string
  firstName: string
  lastName: string
}

export async function saveUserInfo(data: SignUpData) {
  try {
    const { data: result, error } = await supabase
      .from('users')
      .insert([
        {
          email: data.email,
          phone: data.phone,
          first_name: data.firstName,
          last_name: data.lastName,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Error saving user info:', error)
    return { success: false, error: error.message }
  }
}

export async function checkUserExists(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is fine
      throw error
    }

    return { exists: !!data, error: null }
  } catch (error: any) {
    console.error('Error checking user:', error)
    return { exists: false, error: error.message }
  }
}
