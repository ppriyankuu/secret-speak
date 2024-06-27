import { boolean, object, string } from 'zod';

export const messageSchema = object({
  content: string()
    .min(10, { message: 'Content must be at least 10 characters.' })
    .max(300, { message: 'Content must not be longer than 300 characters.' }),
});

export const signInSchema = object({
  identifier: string(),
  password: string(),
});

export const usernameValidation = string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = object({
  username: usernameValidation,

  email: string().email({ message: 'Invalid email address' }),
  password: string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export const verifySchema = object({
  code: string().length(6, 'Verification code must be 6 digits'),
});

export const AcceptMessageSchema = object({
  acceptMessages: boolean(),
});
