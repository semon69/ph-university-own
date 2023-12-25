import { z } from 'zod';
import { UserStatus } from './user.constant';

const userSchemaZod = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, {
      message: 'Password can not be more than 20 words',
    })
    .optional(),
});

const changeStatusSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidationZod = {
  userSchemaZod,
  changeStatusSchema,
};
