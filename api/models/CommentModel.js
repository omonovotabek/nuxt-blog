const {Schema, model} = require('mongoose')

const commentScheam = new Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "posts"
    }
})

module.exports = model('comments', commentScheam)
