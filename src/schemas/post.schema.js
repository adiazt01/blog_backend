import {z} from "zod";

export const postSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
    tags: z.array(z.string()),
})