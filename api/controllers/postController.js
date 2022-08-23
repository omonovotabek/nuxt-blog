const Post = require('../models/PostModel')
const path = require("path")
const fs = require('fs')
create = async function (req, res, next)  {
    try {
    const image = req.files.image;
    const {title, text} = req.body
    image.mv(path.resolve(__dirname, '../../', 'static/images', image.name))
    const post = new Post ({title, text, imageUrl:`/${image.name}`})
    await post.save()
    res.status(201).json(post)
 } catch (error) {
    next(error)
 }
}

getAll = async (req, res, next) => {
  try {
      const posts = await Post.find().sort({date: -1})
      res.status(200).json(posts)
  } catch (error) {
      next(error)
  }
}

getById = async (req, res, next) => {
   try {
       const {id} = req.params
       const post = await Post.findById({_id:id}).populate('comments')
       res.status(200).json(post)
    //    console.log(req.query)
   } catch (error) {
       next(error)
   }
}

update = async (req, res, next) => {
  try {
      const {id} = req.params
      const {text} = req.body
      const $set = {
          text
      }
      const post = await Post.findOneAndUpdate(
      {_id: id}, {$set}, {new: true}
      )
      res.status(200).json(post)
  } catch (error) {
      next(error)
  }
}

remove = async (req, res, next) => {
  try {
      const {id} = req.params
    //    await Post.deleteOne({_id:id})
       const deletePost = await Post.findByIdAndDelete({_id:id})
       res.status(200).json({message: "Пост удален"})
    //  console.log(deletePost)
    //   res.status(200).json(deletePost)
      const filePath = path.resolve(__dirname, '../../', `static/images${deletePost.imageUrl}`)
      fs.unlinkSync(filePath)
  } catch (error) {
      next(error)
  }
}
   
addView = async (req, res, next) => {
    const $set = {
        views: ++req.body.views
    }
    try {
        await Post.findOneAndUpdate({_id: req.params.id}, {$set})
        res.status(204).json() 
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    addView
}