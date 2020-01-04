import { db, storage } from '~/plugins/firebase-init'

const threadLimit = 20

export const state = () => ({
  loading: false,
  categories: [],
  subCategory: null,
  threads: [],
  hasMoreThread: false
})

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setSubCategory(state, subCategory) {
    state.subCategory = subCategory
  },
  setThreads(state, threads) {
    state.threads = threads
  },
  setHasMoreThread(state, hasMoreThread) {
    state.hasMoreThread = hasMoreThread
  }
}

export const actions = {
  async loadCategories({ commit }) {
    const categoriesRef = await db.collection('categories').get()
    const categories = []
    categoriesRef.forEach(doc => {
      categories.push(doc.data())
    })
    commit('setCategories', categories)
  },
  async loadSubCategory({ commit }, subCategoryId) {
    const subCategoryDoc = await db
      .collection('subCategories')
      .doc(subCategoryId)
      .get()

    const subCategory = subCategoryDoc.data()
    commit('setSubCategory', subCategory)
  },
  async loadThreads({ commit }, subCategoryId) {
    commit('setLoading', true)
    const threadsRef = await db
      .collection(`subCategories/${subCategoryId}/threads`)
      .orderBy('publishedAt', 'desc')
      .limit(threadLimit)
      .get()

    const threads = []
    threadsRef.forEach(doc => {
      threads.push(doc.data())
    })
    commit('setThreads', threads)
    commit('setLoading', false)
  },
  checkHasMoreThread({ commit, state }, subCategoryId) {
    if (!state.threads.length) {
      return commit('setHasMoreThread', false)
    }
    const threadLast = state.threads[state.threads.length - 1]
    return db
      .collection(`subCategories/${subCategoryId}/threads`)
      .orderBy('publishedAt', 'desc')
      .startAfter(threadLast.publishedAt)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          commit('setHasMoreThread', false)
          return false
        } else {
          commit('setHasMoreThread', true)
          return true
        }
      })
  },
  async loadMoreThread({ commit, state, dispatch }, subCategoryId) {
    if (!state.threads.length) {
      return commit('setHasMoreThread', false)
    }
    const threadLast = state.threads[state.threads.length - 1]
    const snapshot = await db
      .collection(`subCategories/${subCategoryId}/threads`)
      .orderBy('publishedAt', 'desc')
      .startAfter(threadLast.publishedAt)
      .limit(threadLimit)
      .get()

    const threads = []
    snapshot.forEach(doc => {
      threads.push(doc.data())
    })
    await commit('setThreads', [...state.threads, ...threads])

    return dispatch('checkHasMoreThread', subCategoryId)
  },
  async saveThread({ commit, dispatch }, { subCategoryId, thread }) {
    const threadsRef = db.collection(`subCategories/${subCategoryId}/threads`)
    await threadsRef.doc(thread.id).set(thread)
  },
  async saveImage({ commit }, { subCategoryId, threadId, base64 }) {
    const threadRef = db
      .collection(`subCategories/${subCategoryId}/threads`)
      .doc(threadId)
    const threadSnapshot = await threadRef.get()

    if (threadSnapshot.exists === false) {
      return false
    }

    const storageRef = storage.ref()
    const imagesRef = storageRef.child(`${threadId}/${threadId}.jpeg`)
    await imagesRef.putString(base64, 'data_url').then(function(fileSnapshot) {
      return fileSnapshot.ref.getDownloadURL().then(url => {
        threadRef.update({
          imageUrl: url,
          fullPath: fileSnapshot.metadata.fullPath
        })
      })
    })
  }
}

export const getters = {
  loading: state => state.loading,
  categories: state => state.categories,
  subCategory: state => state.subCategory,
  threads: state => state.threads,
  hasMoreThread: state => state.hasMoreThread
}
