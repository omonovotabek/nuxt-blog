const Comment = require('../models/CommentModel')
const Post = require('../models/PostModel')

createComment = async (req, res, next) => {
  try {
      const {name, text, postId} = req.body
      const comment = await Comment.create({
          name, text, postId
      })
      const post = await Post.findById(postId)

      post.comments.push(comment._id)
      await post.save()
      res.status(201).json(comment)
  } catch (error) {
      next(error)
  }
}   
  deleteComment = async (req, res, next) => {
    try {
      const {id} = req.params
      await Comment.deleteMany({postId:id})
      res.send('')
    } catch (error) {
        next(error)
    }
}

module.exports = {createComment, deleteComment}