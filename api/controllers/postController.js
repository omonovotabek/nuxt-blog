const Post = require("../models/PostModel");
const fileService = require("../service/fileService");

create = async function (req, res, next) {
  try {
    const { title, text, imageUrl } = req.body;
    // const file = req.files.image;
    // const { uniqFileName, typeError } = fileService.createFile("images", file);
    // if (uniqFileName) {
    //   const post = new Post({ title, text, imageUrl: `/${uniqFileName}` });
    //   await post.save();
      const post = new Post({ title, text, imageUrl });
      await post.save();
      res.status(201).json('post');
    // }
    // if (typeError) {
    //   res.status(400).json(typeError);
    // }
  } catch (error) {
    next(error);
  }
};

getAll = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id }).populate("comments");
    res.status(200).json(post);
    //    console.log(req.query)
  } catch (error) {
    next(error);
  }
};

update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const $set = {
      text,
    };
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $set },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    //    await Post.deleteOne({_id:id})
    const deletePost = await Post.findByIdAndDelete({ _id: id });

    res.status(200).json(deletePost.imageUrl);
    
  } catch (error) {
    next(error);
  }
};

addView = async (req, res, next) => {
  const $set = {
    views: ++req.body.views,
  };
  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  addView,
};
