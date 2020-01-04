import { db, firebaseProxy } from '~/plugins/firebase-init'

export const state = () => ({
  bookmarks: []
})

export const mutations = {
  setBookmarks(state, bookmarks) {
    state.bookmarks = bookmarks
  }
}

export const actions = {
  async loadBookmarks({ commit }, { uid }) {
    const likeRef = db
      .collection(`users/${uid}/likeThreads`)
      .orderBy('createdAt', 'desc')
      .limit(20)

    const likeSnapshot = await likeRef.get()

    const likesPromise = likeSnapshot.docs.map(async likeDoc => {
      const like = likeDoc.data()
      const threadSnapshot = await like.thread.get()
      const thread = threadSnapshot.data()
      return {
        ...like,
        thread
      }
    })

    const bookmarks = await Promise.all(likesPromise)
    commit('setBookmarks', bookmarks)
  },
  async storeThread({ commit }, { uid, subCategoryId, threadId }) {
    const threadRef = await db
      .collection(`subCategories/${subCategoryId}/threads`)
      .doc(threadId)

    const likeDoc = db.collection(`users/${uid}/likeThreads`).doc(threadId)

    await likeDoc.set({
      thread: threadRef,
      subCategoryId,
      createdAt: firebaseProxy.firestore.FieldValue.serverTimestamp()
    })
  },
  async removeThread({ commit }, { uid, threadId }) {
    const likeDoc = db.collection(`users/${uid}/likeThreads`).doc(threadId)

    await likeDoc.delete()
  },
  async didBookmark(context, { uid, threadId }) {
    const likeDoc = db.collection(`users/${uid}/likeThreads`).doc(threadId)
    const likeSnapshot = await likeDoc.get()
    return likeSnapshot.exists
  }
}

export const getters = {
  bookmarks: state => state.bookmarks
}
