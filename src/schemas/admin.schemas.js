import { z } from "zod";

export const adminSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .superRefine((data) => {
    if (data.email === "") {
      throw new Error("Invalid username or password");
    }

    if (data.password === "") {
      throw new Error("Invalid username or password");
    }
  });
