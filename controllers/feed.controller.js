import User from "../models/user.model.js";

class FeedController {
	async getFollowersPosts(req, res) {
		const { email } = req.params;

		try {
			const user = await User.findOne({ email: email }).select("following").populate("following");
			const posts = [];
			for (let i = 0; i < user.following.length; i++) {
				const post = {};
				post[user.following[i].firstName] = await User.findOne({ firstName: user.following[i].firstName}).select("posts").populate("posts");
				posts.push(post);
			}

			res.json(posts);
		} catch (error) {
			return console.log(error);
		}
	}
}

const feedController = new FeedController();
export default feedController;
