import jwt from "jsonwebtoken";

export function authorizationMiddleWare(req, res, next) {
	const { token } = req.cookies;
	try {
		const payload = jwt.verify(token, "test");
		if (payload) {
			next();
		}
	} catch (error) {
		res.clearCookie("token").status(401).send("Invalid JWT token!");
	}
}
