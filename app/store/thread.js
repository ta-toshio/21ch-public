import { db } from '~/plugins/firebase-init'

export const state = () => ({
  loading: false,
  hasMore: false,
  thread: null,
  comments: [],
  commentLast: null,
  commentsPool: [],
  watchThreads: []
})

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setHasMore(state, hasMore) {
    state.hasMore = hasMore
  },
  setThread(state, thread) {
    state.thread = thread
  },
  setComments(state, comments) {
    state.comments = comments
  },
  addCommentsPool(state, comment) {
    state.commentsPool = [...state.commentsPool, comment]
  },
  clearCommentPool(state) {
    state.commentsPool = []
  },
  setCommentLast(state, commentLast) {
    state.commentLast = commentLast
  },
  subscribeThread(state, { threadId, unsubscribeFn }) {
    state.watchThreads = [...state.watchThreads, { threadId, unsubscribeFn }]
  },
  reset(state) {
    state.loading = false
    state.hasMore = false
    state.thread = null
    state.comments = []
    state.commentsPool = []
    state.commentLast = null
    state.watchThreads = []
  }
}

export const actions = {
  async loadThread({ commit, dispatch }, { subCategoryId, threadId }) {
    const threadDoc = await db
      .collection(`subCategories/${subCategoryId}/threads`)
      .doc(threadId)
      .get()

    const thread = threadDoc.data()
    commit('setThread', thread)

    // await dispatch('loadComments', { subCategoryId, threadId })
  },
  async loadComments({ commit }, { subCategoryId, threadId }) {
    const threadCommentsRef = await db
      .collection(`subCategories/${subCategoryId}/threads/${threadId}/comments`)
      .orderBy('publishedAt', 'desc')
      .limit(5)
      .get()

    const comments = []
    threadCommentsRef.forEach(doc => {
      comments.push(doc.data())
    })
    commit('setComments', comments)
  },
  async watchThread({ commit, state, dispatch }, { subCategoryId, threadId }) {
    const threadRef = await db
      .collection(`subCategories/${subCategoryId}/threads/${threadId}/comments`)
      .orderBy('publishedAt', 'desc')
      .limit(1000)

    let loaded = false

    const unsubscribeFn = threadRef.onSnapshot(
      docSnapshot => {
        let comments = [...state.comments]
        docSnapshot.docChanges().forEach(change => {
          const { doc, type } = change
          const newComment = doc.data()
          if (type === 'added') {
            if (loaded) {
              comments = [...comments, newComment]
            } else {
              comments = [newComment, ...comments]
            }
          } else if (type === 'modified') {
            comments = comments.map(comment => {
              if (comment.id === newComment.id) {
                return newComment
              }
              return comment
            })
          } else if (type === 'removed' && !doc.exists) {
            comments = comments.filter(comment => {
              return comment.id !== newComment.id
            })
          }
        })
        loaded = true
        commit('setComments', comments)
      },
      err => {
        console.log(`Encountered error: ${err}`)
      }
    )

    commit('subscribeThread', { threadId, unsubscribeFn })
  },
  confirmHasMore({ commit, state }, { subCategoryId, threadId }) {
    const commentLast = state.commentLast
    if (!commentLast) {
      return null
    }

    const threadCommentsRef = db
      .collection(`subCategories/${subCategoryId}/threads/${threadId}/comments`)
      .orderBy('publishedAt', 'asc')
      .startAfter(commentLast.publishedAt)

    threadCommentsRef.get().then(snapshot => {
      if (snapshot.exists) {
        commit('setHasMore', true)
      } else {
        commit('setHasMore', false)
      }
    })
  },
  loadMoreComment({ commit, state }) {
    const commentLast = state.commentLast
    if (!commentLast) {
      return null
    }
    // implement future.
  },
  async saveComment(
    { commit, dispatch },
    { subCategoryId, threadId, comment }
  ) {
    const commentsRef = db.collection(
      `subCategories/${subCategoryId}/threads/${threadId}/comments`
    )

    await commentsRef.doc(comment.id).set(comment)
    // await commentsRef.add(comment)

    const commentRef = await db
      .collection(`subCategories/${subCategoryId}/threads/${threadId}/comments`)
      .doc(comment.id)

    const commentSnapshot = await commentRef.get()
    const commentMasterData = commentSnapshot.data()

    const threadRef = await db
      .collection(`subCategories/${subCategoryId}/threads`)
      .doc(threadId)

    // await threadRef.update({
    //   count: firebaseProxy.firestore.FieldValue.increment(1)
    // })

    db.runTransaction(t => {
      return t.get(threadRef).then(doc => {
        const thread = doc.data()
        const count = thread.count + 1
        const comments = [
          ...thread.comments,
          { ...commentMasterData, seq: count }
        ]
        if (comments.length > 10) comments.shift()
        t.update(threadRef, { count, comments })
        return Promise.resolve(count)
      })
    })
      .then(count => {
        commentRef.update({ seq: count })
      })
      .catch(err => {
        console.log('Transaction failure:', err)
      })
  },
  async postTwitter(context, title) {
    try {
      const res = await this.$axios.$post('/api/post-twitter', { title })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  },
  unsubscribe({ state }) {
    state.watchThreads.forEach(watchThread => {
      const unsubscribeFn = watchThread.unsubscribeFn
      unsubscribeFn()
    })
  },
  clear({ commit }) {
    commit('reset')
  }
}

export const getters = {
  loading: state => state.loading,
  thread: state => state.thread,
  comments: state => state.comments
}
