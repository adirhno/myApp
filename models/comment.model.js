import { model, Schema } from "mongoose";

const commentSchema = new Schema({
	content: { type: String, required: true },
	uploadedBy: { type: String },
},
{timestamps: true });

const Comment = model("Comment", commentSchema, "Comment");

export default Comment;
