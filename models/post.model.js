import { model, Schema } from "mongoose";

const postSchema = new Schema({
	uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
	text: { type: String, required: true },
	likes: { type: Number, default: 0 },
	comments: {
		type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
		default: [],
	},
},
{timestamps: true});

const Post = model("Post", postSchema, "Post");

export default Post;
