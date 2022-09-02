import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  name: z.string(),
});

export const createPostSchema = z.object({
  title: z.string().max(256, 'Max title length is 356'),
  description: z.string().min(10),
  body: z.string().min(10),
})

export const getSinglePostSchema = z.object({
  postId: z.string().uuid(),
})

export type Login = z.infer<typeof loginSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type CreatePostInput = z.TypeOf<typeof createPostSchema>