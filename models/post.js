import mongoose, {Schema, model, models} from "mongoose";

const PostSchema = new Schema({
    // Add link to the user creating the post
    // same as foreign key in sql
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    quote: {
        type: String,
        required : [true, 'Quote is required!']
    },
    tag: {
        type: String,
        required : [true, 'Tag is required!']
    },
})

const Post = models.Post || model('Post', PostSchema)

export default Post