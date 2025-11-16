import { apiClient } from '@/core/config/axios.config'
import type { UserProfile } from '../types/userProfile.types'

export const profileApiService = {
  async getCurrentProfile(): Promise<UserProfile> {
    const response = await apiClient.get('/profile/me')
    return response.data
  },

  async updateProfile(payload: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put('/profile/me', payload)
    return response.data
  }
}

