import { defineStore } from 'pinia'

interface State {
    user: UserObject
    accessToken: string | null
    loggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: {} as UserObject,
            accessToken: null,
            loggedIn: false,
        }
    },
    persist: true,
    getters: {
        getToken(state) {
            return state.accessToken
        },
        getUser(state) {
            return state.user
        },
        getStatus(state) {
            return state.loggedIn
        },
    },
    actions: {
        async login(credentials: object) {
            try {
                const { $api } = useNuxtApp()
                const response: any = await $api('/student/login', {
                    method: 'POST',
                    body: { ...credentials }
                })
                this.accessToken = response.access_token
                this.loggedIn = true
                this.user = response.user
                return response;
            } catch (error) {
                throw error
            }
        },
        async register(credentials: object) {
            try {
                const { $api } = useNuxtApp()
                const response: any = await $api('/student/register', {
                    method: 'POST',
                    body: { ...credentials }
                })
                this.accessToken = response.access_token
                this.loggedIn = true
                this.user = response.user
                return response;
            } catch (error) {
                throw error
            }
        },
        async userInfo() {
            try {
                const { $api } = useNuxtApp()
                const response: any = await $api('/customer/user')
                this.user = response.user
            } catch (error) {
                throw error
            }
        },
        async logout() {
            try {
                const { $api } = useNuxtApp()
                const response: any = await $api('/logout');
                const reset = useResetStore()
                reset.resetStore()
            } catch (error) {
                const reset = useResetStore()
                reset.resetStore()
                throw error
            }
        },
    }
})

interface UserObject {
    name: string
    email: string
    phone: string
    avatar: string | null
}