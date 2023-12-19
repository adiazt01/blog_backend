import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../app";

const admin = {
  username: "admin",
  password: bcrypt.hashSync("admin", 10),
};

export const loginAdmin = async (req, res) => {
  if (
    req.body.username !== admin.username ||
    !bcrypt.compareSync(req.body.password, admin.password)
  ) {
    return res.status(401).json({ message: "Invalid username or password" });
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
  if (posts == undefined) {
    return res.status(404).json({ posts: [] });
  }
  res.status(200).json(posts);
}