import { isEmpty } from '@/utils'

export const state = () => ({
  loading: false,
  token: '',
  user: null
})

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
  clearToken: state => (state.token = ''),
  clearUser: state => (state.user = null)
}

export const actions = {
  loginUser({ commit }, user) {
    commit('setUser', user)
  },
  logoutUser({ commit }) {
    commit('clearToken')
    commit('clearUser')
  },
  async getUserFromServer({ commit }, cookie) {
    if (!cookie) {
      return
    }
    try {
      const res = await this.$axios.$get('/api/user', { params: { cookie } })
      if (!isEmpty(res)) {
        commit('setUser', res.user)
        commit('setToken', res.token)
      }
    } catch (e) {
      console.error(e)
    }
  },
  nuxtServerInit({ commit, dispatch }, { req }) {
    if (!isEmpty(req.fireAuth)) {
      req.fireAuth.user && commit('setUser', req.fireAuth.user)
      req.fireAuth.token && commit('setToken', req.fireAuth.token)
      req.fireAuth.user && console.log(req.fireAuth.user.uid)
    }
    // await dispatch('getUserFromServer', req.headers.cookie)
  }
}

export const getters = {
  loading: state => state.loading,
  user: state => state.user,
  isAuthenticated: state => {
    const isAnonymous = state.user && state.user.isAnonymous
    return !!state.token && isAnonymous === false
  }
}
