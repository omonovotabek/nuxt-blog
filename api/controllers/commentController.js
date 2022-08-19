const Comment = require('../models/CommentModel')
const Post = require('../models/PostModel')
create = async (req, res) => {
  try {
      const {name, text, postId} = req.body
      const comment = await Comment.create({
          name, text, postId
      })
      const post = await Post.findById(postId)
      post.comments.push(comment._id)
      await post.save()
      res.status(201).json(comment)
  } catch (e) {
      res.status(500).json(e)
  }
}

module.exports = {create}