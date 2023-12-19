import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  console.log(process.env.SECRET_KEY);

  const token = jwt.sign({ username: admin.username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token)
  res.status(200).json({ message: "Login successfully" });
};
