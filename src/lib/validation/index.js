import * as z from "zod";
import { checkUsernameAvailability } from "../appwrite/api";

export const signInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-z0-9_]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, and underscores.",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-z0-9_]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, and underscores.",
    })
    .refine(
      async (username) => {
        const isAvailable = await checkUsernameAvailability(username);
        return isAvailable;
      },
      {
        message: "Username is already taken.",
      }
    ),

  name: z
    .string()
    .min(2, { message: "Display name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
      message:
        "Password must contain at least one letter, one number, and one special character",
    }),
});

export const postFormSchema = z.object({
  caption: z
    .string()
    .min(1, "Caption is required")
    .max(3000, "Caption is too long"),
  tags: z.string().optional(),
  image: z.any().nullable(),
});

export const userProfileFormSchema = z.object({
  avatar: z.any().nullable(),
  name: z.string().min(2, "Display name must be at least 2 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z.string().max(150, "Bio is too long"),
});

export const commentFormSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
});
