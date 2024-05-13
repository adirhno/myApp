import { model, Schema } from "mongoose";

const followerSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true }
});

const Follower = model("Follower", followerSchema, "Follower");

export default Follower;
