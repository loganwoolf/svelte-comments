import express from 'express'
const router = express.Router()

export default (query) => {
  router.get('/', (req, res) => {
    query('comments')
      .join('users', 'users.id', 'comments.user')
      .select({
        id: 'comments.id',
        content: 'comments.content',
        createdAt: 'comments.created_at',
        score: 'comments.score',
        username: 'users.username',
        image: 'users.image_png',
        replyTo: 'comments.reply_to',
        replyName: 'comments.reply_name',
      })
      .then((rows) => {
        return rows.map((comment) => {
          comment.user = { username: comment.username, image: comment.image }
          delete comment.username
          delete comment.image
          return comment
        })
      })
      .then((rows) => {
        const newTree = []
        rows.forEach((comment) => {
          if (!comment.replyTo) {
            comment.replies = []
            delete comment.replyTo
            delete comment.replyName
            newTree.push(comment)
            return
          }
          const parentIndex = newTree.findIndex(
            (parent) => parent.id === comment.replyTo
          )
          newTree[parentIndex].replies.push(comment)
        })
        return newTree
      })
      .then((data) => res.json(data))
  })

  router.post('/', (req, res) => {
    const currentUserID = 4
    const commentObj = {
      content: req.body.content,
      user: currentUserID,
    }

    query('comments')
      .insert(commentObj)
      .then(() => {
        query('comments')
          .join('users', 'users.id', 'comments.user')
          .select({
            id: 'comments.id',
            content: 'comments.content',
            createdAt: 'comments.created_at',
            score: 'comments.score',
            username: 'users.username',
            image: 'users.image_png',
            replyTo: 'comments.reply_to',
            replyName: 'comments.reply_name',
          })
          .orderBy('created_at', 'desc')
          .limit(1)
          .then((rows) => {
            return rows.map((comment) => {
              comment.user = {
                username: comment.username,
                image: comment.image,
              }
              delete comment.username
              delete comment.image
              return comment
            })
          })
          .then((rows) => {
            res.json(rows[0])
          })
      })
      .catch((error) => console.log({ error }))
  })

  return router
}
