const {Schema, model} = require('mongoose')

const commentScheam = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
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
