const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
        },
    text: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    comments:[ 
    {
        type: Schema.Types.ObjectId,
        ref:'comments'     
    }
    ]
})

module.exports = model('posts', postSchema)
