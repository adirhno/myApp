import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

class CommentsController {
	async createComment(req, res) {
		const { content, email, postId } = req.body;

		try {
			const newComment = new Comment({ content, uploadedBy: email });
			newComment.save();
			await Post.findByIdAndUpdate(
				{ _id: postId },
				{ $push: { comments: newComment } }
			).exec();
			res.json(newComment);
		} catch (error) {
			console.log(error);
		}
	}

	async updateComment(req, res) {
		const { commentId, content } = req.body;
		try {
			const updatedComment = await Comment.findByIdAndUpdate(
				{ _id: commentId },
				{
					$set: { content },
				}
			);

			res.json(updatedComment);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteComment(req, res) {
		const { id } = req.params;
		try {
			await Comment.findByIdAndDelete(id).exec();
			res.sendStatus(204);
		} catch (error) {
			console.log(error);
		}
	}
}

const commentsController = new CommentsController();
export default commentsController;
