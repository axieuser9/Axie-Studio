import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://othsnnoncnerjogvwjgc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90aHNubm9uY25lcmpvZ3Z3amdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTY1NDcsImV4cCI6MjA2NzczMjU0N30.bAYQm2q_LH6xCMXrPsObht6pmFbz966MU-g7v1SRzrE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}