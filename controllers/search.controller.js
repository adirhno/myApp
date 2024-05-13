import User from "../models/user.model.js";
import Post from "../models/post.model.js";

class SearchController {
	async getUserByFullname(req, res) {
		const { firstName, lastName } = req.body;
		try {
			const user = await User.findOne({ $and: [{ firstName: firstName }, { lastName: lastName }] });
			res.json(user);
		} catch (error) {
			return console.log(error);
		}
	}

    async getPostByText(req, res) {
		const { text } = req.body;
		try {
			const user =  Post.findOne({ "text" : { $regex: text, $options: 'i' }}).exce()
			res.json(user);
            
		} catch (error) {
			return console.log(error);
		}
	}
}

const searchController = new SearchController();
export default searchController;
