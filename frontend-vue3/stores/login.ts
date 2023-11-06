import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => {
    return { user: 'bbbb' }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setUser(newUser) {
      this.user = newUser
    },
  },
  getters: {
    getAuthUser: (state) => state.user,
  },
})