import { db } from '~/plugins/firebase-init'

export const state = () => ({})

export const mutations = {}

export const actions = {
  async storeUser({ commit }, uid) {
    const userDoc = db.collection(`users`).doc(uid)
    const userSnapshot = await userDoc.get()

    if (!userSnapshot.exists) {
      await userDoc.set({ uid })
    }
  }
}

export const getters = {}
