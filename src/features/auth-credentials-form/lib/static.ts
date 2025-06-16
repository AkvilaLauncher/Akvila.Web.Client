import { z } from 'zod';

export const signInSchema = z.object({
  login: z
    .string()
    .min(1, { message: "You haven't filled in the field" })
    .transform((v) => v.trim()),
  password: z.string().min(1, { message: "You haven't filled in the field" }),
});

export const signUpSchema = z
  .object({
    login: z
      .string()
      .min(3, { message: 'Username is too short' })
      .max(50, { message: 'Username is too long' })
      .transform((v) => v.trim()),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(8, { message: 'Password is too short' })
      .regex(/\d/, { message: 'The password must contain at least one digit' })
      .regex(/[A-Z]/, {
        message: 'The password must contain at least one capital letter.',
      }),
    confirmPassword: z.string().min(8, { message: 'Repeat password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'The entered passwords do not match',
  });

export type SignInFormSchemaType = z.infer<typeof signInSchema>;
export type SignUpFormSchemaType = z.infer<typeof signUpSchema>;
