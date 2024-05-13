import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authorizationMiddleWare } from "./middlewares/userAuth.middleware.js";

import { router as usersRoutes } from "./routes/users.route.js";
import { router as authRoutes } from "./routes/auth.route.js";
import { router as commentsRoutes } from "./routes/comments.route.js";
import { router as postsRoutes } from "./routes/posts.route.js";
import { router as feedsRoutes } from "./routes/feeds.route.js";
import { router as searchRoutes } from "./routes/search.route.js";

const port = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/myApp", { useNewUrlParser: true }).then(() => console.log("conneted to DB")).catch((err) => console.log(err));
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/users", [authorizationMiddleWare], usersRoutes);
app.use("/comments", [authorizationMiddleWare], commentsRoutes);
app.use("/posts", authorizationMiddleWare, postsRoutes);
app.use("/search", authorizationMiddleWare, searchRoutes);
app.use("/feeds", authorizationMiddleWare, feedsRoutes);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers","Content-Type, Authorization, Content-Length, X-Requested-With");
	next();
});
app.use(cookieParser());

app.listen(port, function () {
	console.log("Server up and running on port ", port);
});
