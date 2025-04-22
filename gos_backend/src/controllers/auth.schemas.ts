import { z } from "zod";

const usernameSchema = z.string().min(8).max(20);
const passwordSchema = z.string().min(8).max(20);


export const loginSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    userAgent: z.string().optional(),
})

export const registerSchema = loginSchema
    .extend({
        confirmPassword: passwordSchema,
    })
    .refine(
    (data) => data.password === data.confirmPassword, {
        message: "Passwords do not match", 
        path: ["confirmPassword"],
    });