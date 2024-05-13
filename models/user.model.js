import { model, Schema } from "mongoose";
import authUtils from "../utils/auth.utils.js";

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },
	address: { type: String, required: true },
    hashedPassword: { type: String, required: true, set: authUtils.hashPassword },
	following: {
		type: [{ type: Schema.Types.ObjectId, ref: "Follower" }],
		default: [],
	},
	posts: {
		type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
		default: [],
	}
});

const User = model("User", userSchema, "User");


export default User;
