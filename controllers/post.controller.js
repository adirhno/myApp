import User from "../models/user.model.js";
import Post from "../models/post.model.js";

import mongoose from "mongoose";

class PostsController {
	async createPost(req, res) {
		const { text, email } = req.body;

		try {
			const uploadedBy = await User.findOne({ email: email });
			const newPost = new Post({ text, uploadedBy: uploadedBy });
			newPost.save();
			const user = await User.findOneAndUpdate(
				{ email: email },
				{ $push: { posts: newPost } }
			).exec();
			res.json(user);
		} catch (error) {
			console.log(error);
		}
	}

	async getPostsByUserEmail(req, res) {
		const { email } = req.params;
		try {
			const user = await User.findOne({ email: email })
				.select("posts")
				.populate("posts");

			res.json(user.posts);
		} catch (error) {
			return console.log(error);
		}
	}

	async updatePostLikes(req, res) {
		const { likeCounter, postId } = req.body;
		try {
			const updatedLikes = await Post.findByIdAndUpdate(postId, {
				$set: { likeCounter },
			});
			res.json(updatedLikes);
		} catch (error) {
			console.log(error);
		}
	}

	async updatePost(req, res) {
		const { postId, text } = req.body;
		try {
			const updatedPost = await Post.findByIdAndUpdate(postId, {
				$set: { text },
			});

			if (updatedPost === null) {
				throw "post dosent exist!";
			}
			res.json(updatedPost);
		} catch (error) {
			console.log(error);
		}
	}

	async deletePost(req, res) {
		let { text } = req.params;
		try {
			await Post.findOneAndDelete(text).exec();
			res.sendStatus(204);
		} catch (error) {
			console.log(error);
		}
	}
}

const postsController = new PostsController();
export default postsController;
