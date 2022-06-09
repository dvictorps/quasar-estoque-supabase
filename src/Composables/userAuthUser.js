import { ref } from 'vue'
import useSupabase from 'boot/supabase'

const user = ref(null)

export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) throw error
    return user
  }

  const startConfig = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .insert({ user_id: id })
    if (error) throw error
    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider })
    if (error) throw error
    return user
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/login`
      }
    )
    startConfig('config', user.id)
    if (error) throw error
    return user
  }

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.api.updateUser(
      accessToken,
      { password: newPassword }
    )
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    logout,
    loginWithSocialProvider,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
    startConfig
  }
}
