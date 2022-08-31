const Post = require("../models/PostModel");

create = async function (req, res, next) {
  try {
    const { title, text } = req.body;
    const file = req.files.image;
    let type;
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      type = "image";
    }
    if (file.mimetype == "audio/mpeg") {
      type = "audio";
    }
    if (file.mimetype == "video/mp4") {
      type = "video";
    }
    if (
      file.mimetype == "application/pdf" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      type = "document";
    }
    const post = new Post({
      title,
      text,
      imageUrl: file.firebaseUrl,
      imageName: req.uniqName,
      type,
    });
    await post.save();
    res.status(201).json("post");
  } catch (error) {
    next(error);
  }
};

getAll = async (req, res, next) => {
  try {
    const { sort } = req.query;
    let posts;
    switch (sort) {
      case "images": {
        posts = await Post.find({type: "image"}).sort({ date: -1 });
        break;
      }
      case "audios": {
        posts = await Post.find({ type: "audio" }).sort({ date: -1 });
        break;
      }
      case "videos": {
        posts = await Post.find({ type: "video" }).sort({ date: -1 });
        break;
      }
      case "documents": {
        posts = await Post.find({ type: "document" }).sort({ date: -1 });
        break;
      }
      default:
        posts = await Post.find().sort({ date: -1 });
        break;
    }
    return res.json(posts);
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
    await Post.deleteOne({ _id: id });

    res.status(200).json("deletePost.imageUrl");
  } catch (error) {
    next(error);
  }
};

download = (req, res, next) => {
  res.send("download");
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
