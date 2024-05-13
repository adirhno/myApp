import User from "../models/user.model.js";
import authUtils from "../utils/auth.utils.js";

class AuthController {
	async register(req, res) {
           const { password, confirmPassword, firstName, lastName, email, address } = req.body;
		try {
			const hashedPassword = authUtils.hashPassword(password)
            const userData = { confirmPassword, firstName, lastName, email, address, hashedPassword};
            const foundUser = await User.findOne({ email });
			if (foundUser) throw "email already used!";
			const user = new User(userData);
			await user.save();

			const payload = { userName: user.firstName };
			const tokenCookie = authUtils.createTokenCookie(payload);
			res.setHeader("Set-Cookie", tokenCookie);
			res.json({ firstName: user.firstName, lastName: user.lastName});
		} catch (error) {
			console.log(error);
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email: email });
			if (!user) {
				throw "User Dosent Exist!";
			}

			const userHashedPassword = user.hashedPassword;
			authUtils.verifyPassword(password, userHashedPassword);

			const payload = { email: user.email };
			const tokenCookie = authUtils.createTokenCookie(payload);
			res.setHeader("Set-Cookie", tokenCookie);
			res.json({ firstName: user.firstName, lastName: user.lastName });
		} catch (error) {
			console.log(error);
		}
	}

	async logout(req, res) {
		res.clearCookie("token").sendStatus(204);
	}
}

const authController = new AuthController();
export default authController;
