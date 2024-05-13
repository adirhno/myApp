import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

class AuthUtils {
	createTokenCookie(payload) {
		const token = this.createJWT(payload);
		const tokenCookie = serialize("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			maxAge: 999999,
		});
		return tokenCookie;
	}

	createJWT(payload) {
		return jwt.sign(payload, "test", {
			expiresIn: "2h",
		});
	}

	verifyJWT(password, hashedPassword) {
		return bcrypt.compareSync(password, hashedPassword);
	}

	hashPassword(password) {
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(password, salt);
		return hashedPassword;
	}

	verifyPassword(password, hashedPassword) {
		const passwordVerified = bcrypt.compare(password, hashedPassword);
		if (!passwordVerified) {
			throw "invalid password!";
		}
		return passwordVerified;
	}
}

const authUtils = new AuthUtils();
export default authUtils;
