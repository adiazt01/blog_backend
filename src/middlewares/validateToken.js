import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.username = decoded.username;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};
