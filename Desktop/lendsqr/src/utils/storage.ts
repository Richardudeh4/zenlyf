import type { User } from '../services/api'

const STORAGE_KEY = 'lendsqr_user_details'

/**
 * Save user details to localStorage
 */
export const saveUserDetails = (userId: string, userData: User): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const users = stored ? JSON.parse(stored) : {}
    users[userId] = {
      ...userData,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch (error) {
    console.error('Error saving user details to localStorage:', error)
  }
}

/**
 * Get user details from localStorage
 */
export const getUserDetails = (userId: string): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const users = JSON.parse(stored)
    const userData = users[userId]
    if (userData) {
      // Remove the savedAt field before returning
      const { savedAt, ...user } = userData
      return user as User
    }
    return null
  } catch (error) {
    console.error('Error getting user details from localStorage:', error)
    return null
  }
}

/**
 * Get all stored user details
 */
export const getAllStoredUsers = (): Record<string, User> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return {}
    const users = JSON.parse(stored)
    // Remove savedAt from all users
    const cleanedUsers: Record<string, User> = {}
    Object.keys(users).forEach((key) => {
      const { savedAt, ...user } = users[key]
      cleanedUsers[key] = user as User
    })
    return cleanedUsers
  } catch (error) {
    console.error('Error getting all stored users:', error)
    return {}
  }
}

/**
 * Clear all stored user details
 */
export const clearAllUserDetails = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing user details from localStorage:', error)
  }
}
