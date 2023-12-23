import { prisma } from "../app.js";

export const searchPosts = async (req, res) => {
	const { search } = req.params;

	if (!search) {
		const posts = await prisma.post.findMany();
		if (!posts) {
			res.status(200).json({ message: [] });
		} else {
			res.status(200).json(posts);
		}
	}

	const posts = await prisma.post.findMany({
		where: {
			OR: [
				{ title: { contains: search, mode: "insensitive" } },
				{ content: { contains: search, mode: "insensitive" } },
			],
		},
	});

	res.status(200).json(posts);
};

export const getAllPosts = async (req, res) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const startIndex = (page - 1) * limit;

	const posts = await prisma.post.findMany({
		skip: startIndex,
		take: limit,
	});

	res.status(200).json(posts);
};

export const getLastsFivePost = async (req, res) => {
	const posts = await prisma.post.findMany({
		take: 5,
		orderBy: {
			createdAt: "desc",
		},
	});

	res.status(200).json(posts);
};
