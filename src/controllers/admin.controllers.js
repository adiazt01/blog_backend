import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../app.js";

const admin = {
	username: "admin",
	password: bcrypt.hashSync("admin", 10),
};

export const loginAdmin = async (req, res) => {
	if (
		req.body.username !== admin.username ||
		!bcrypt.compareSync(req.body.password, admin.password)
	) {
		return res.status(401).json({ message: "Invalid data on fields" });
	}

	const token = jwt.sign({ username: admin.username }, process.env.SECRET_KEY, {
		expiresIn: "1h",
	});

	res.cookie("token", token);
	res.status(200).json({ message: "Login successfully" });
};

export const logoutAdmin = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logout successfully" });
};

export const getPosts = async (req, res) => {
	const posts = await prisma.post.findMany();
	if (posts === undefined) {
		return res.status(200).json({ posts: [] });
	}
	res.status(200).json(posts);
};

export const createPost = async (req, res) => {
	const { title, content, tags } = req.body;

	const newPost = await prisma.post.create({
		data: {
			title,
			content,
			tags,
		},
	});

	res.status(200).json({ message: "Create post successfully", newPost });
};

export const updatePost = async (req, res) => {
	const { title, content, tags } = req.body;

	const post = await prisma.post.update({
		where: { id: req.params.id },
		data: {
			title,
			content,
			tags,
		},
	});

	res.status(200).json({ message: "Update post successfully", post });
};
