import Follower from "../models/follower.model.js";
import User from "../models/user.model.js";

class UserController {
	async trackUser(req, res) {
		const { userEmail, userToTrackFullname } = req.body;

		try {
			const follower = new Follower(userToTrackFullname);
			follower.save();
			const userToTrack = await User.findOneAndUpdate({ email: userEmail }, { $push: { following: follower } }).exec();
			console.log(userToTrack);
			res.json(userToTrack);
		} catch (error) {
			console.log(error);
		}
	}

	async getUserPosts(req, res) {
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
}

const userController = new UserController();
export default userController;
