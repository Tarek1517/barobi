// stores/auth.ts
import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export interface UserObject {
  name: string
  email: string
  phone: string
  avatar?: string | null
}

interface AuthState {
  user: UserObject | null
  accessToken: string | null
  loggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: null,
    loggedIn: false,
  }),
  persist: true, // saves state across reloads
  getters: {
    getToken: (state) => state.accessToken,
    getUser: (state) => state.user,
    getStatus: (state) => state.loggedIn,
  },
  actions: {
  async login(credentials: { phone: string; password: string }) {
      try {
        const { $api } = useNuxtApp()
        const response: any = await $api('/login', {
          method: 'POST',
          body: credentials,
        })

        this.accessToken = response.access_token
        this.loggedIn = true
        this.user = response.user

        return response
      } catch (error: any) {
        if (error?.data?.errors) {
          throw {
            type: 'validation',
            errors: error.data.errors,
          }
        }
        throw {
          type: 'api',
          message: error?.data?.message || error.message || 'Something went wrong',
        }
      }
    },

    async register(credentials: { name: string; phone: string; password: string }) {
      try {
        const { $api } = useNuxtApp()
        const response: any = await $api('/register', {
          method: 'POST',
          body: credentials,
        })

        this.accessToken = response.access_token
        this.loggedIn = true
        this.user = response.user

        return response
      } catch (error) {
        throw error
      }
    },

    // Fetch current user info
    async userInfo() {
      try {
        const { $api } = useNuxtApp()
        const response: any = await $api('/user', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })

        this.user = response.user
      } catch (error) {
        throw error
      }
    },

    async logout() {
      try {
        const { $api } = useNuxtApp()
        await $api('/logout', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      } catch (error) {
        console.error('Logout error', error)
      } finally {
        this.reset()
      }
    },

    reset() {
      this.user = null
      this.accessToken = null
      this.loggedIn = false
    },
  },
})
