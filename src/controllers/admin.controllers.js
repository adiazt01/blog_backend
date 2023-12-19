import bcrypt from "bcryptjs";

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

  res.status(200).json({ message: "Login successfully" });
};
