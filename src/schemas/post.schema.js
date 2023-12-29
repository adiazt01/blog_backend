import { z } from "zod";

export const postSchema = z.object({
	title: z.string().min(5),
	content: z.string().min(10),
	tags: z.string(),
});

export const postUpdateSchema = z.object({
	title: z.string(),
	content: z.string(),
	tags: z.string(),
});
