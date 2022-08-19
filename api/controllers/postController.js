const Post = require('../models/PostModel')

create = async function (req, res)  {
    // if(!req.file)
    //   return res.status(400).json({message:'Faylni to\'gri kiriting'})
      
    try {
    const {title, text} = req.body
    // const {path} = req.file
    const post = new Post ({title, text, imageUrl:`/${req.file.filename}`})
    // post.imageUrl = path
    await post.save()
    res.status(201).json(post)
 } catch (e) {
    res.status(500).json(e)
 }
}

getAll = async (req, res) => {
  try {
      const posts = await Post.find().sort({date: -1})
      res.status(200).json(posts)
  } catch (e) {
      res.status(500).json(e)
  }
}

getById = async (req, res) => {
   try {
       const {id} = req.params
       const post = await Post.findById({_id:id}).populate('comments')
       res.status(200).json(post)
    //    console.log(req.query)
   } catch (e) {
       res.status(500).json(e)
   }
}

update = async (req, res) => {
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
  } catch (e) {
      res.status(500).json(e)
  }
}

remove = async (req, res) => {
  try {
      const {id} = req.params
      await Post.deleteOne({_id:id})
      res.status(200).json({message: "Пост удален"})
    //   const deletePost = await Post.findByIdAndDelete({_id:id})
    //   res.status(200).json(deletePost)
  } catch (e) {
      res.status(500).json(e)
  }
}

addView = async (req, res) => {
    const $set = {
        views: ++req.body.views
    }
    try {
        await Post.findOneAndUpdate({_id: req.params.id}, {$set})
        res.status(204).json()
    } catch (e) {
        res.status(500).json(e)
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