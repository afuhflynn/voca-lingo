import { z } from "zod"

// Validation schema for user registration
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// Validation schema for transcription
export const transcriptionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string(),
  audioUrl: z.string().url("Audio URL must be valid"),
  date: z.string().datetime("Invalid date format"),
  duration: z.number().positive("Duration must be positive"),
})

// Validation schema for login
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

