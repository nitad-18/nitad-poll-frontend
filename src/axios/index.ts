import type { User } from '$lib/types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true,
})

const logout = async (): Promise<boolean> => {
  const response = await instance.delete('/auth/logout')
  return response.status === 204
}

const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  const response = await instance.post(
    'auth/login',
    { username, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
  const data = await response.data
  return response.status === 200 ? data : null
}

const axiosInstance = {
  logout,
  login,
}

export default axiosInstance
