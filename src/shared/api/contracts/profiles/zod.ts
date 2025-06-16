import { z } from 'zod';

export const ModDetailsEntitySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Mod name must be longer than 2 characters' })
    .max(100, { message: 'Mod name must not be more than 100 characters' }),
  description: z
    .string()
    .min(2, { message: 'Mod description must be longer than 2 characters' })
    .max(1000, { message: 'Mod description must not be more than 1000 characters' }),
});

export const CreateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be longer than 2 characters' })
    .max(100, { message: 'Name must not be more than 100 characters' }),
  displayName: z
    .string()
    .min(2, { message: 'Name must be longer than 2 characters' })
    .max(100, { message: 'Name must not be more than 100 characters' }),
  description: z
    .string()
    .min(2, { message: 'Description must be longer than 2 characters' })
    .max(1000, {
      message: 'Description must no be longer more than 1000 characters',
    }),
  version: z.string({
    errorMap: () => ({
      message: 'Game version not selected',
    }),
  }),
  loaderVersion: z.string().optional(),
  gameLoader: z.string(),
  icon: z.any(),
});

export const EditProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be longer than 2 characters' })
    .max(100, { message: 'Name must not be more than 100 characters' }),
  displayName: z
    .string()
    .min(2, { message: 'Name must be longer than 2 characters' })
    .max(100, { message: 'Name must not be more than 100 characters' }),
  description: z
    .string()
    .min(2, { message: 'Description must be longer than 2 characters' })
    .max(1000, {
      message: 'Description must no be longer more than 1000 characters',
    }),
  jvmArguments: z.string().optional(),
  gameArguments: z.string().optional(),
  priority: z.coerce.number().optional(),
  icon: z.any(),
  isEnabled: z.boolean().default(true).optional(),
  background: z.any(),
});

export const RestoreProfileSchema = z.object({
  javaVersion: z.string().optional(),
});

export const EditImageProfileSchema = z.object({
  icon: z.any(),
  background: z.any(),
});

export type EditImageProfileSchemaType = z.infer<typeof EditImageProfileSchema>;
export type CreateProfileFormSchemaType = z.infer<typeof CreateProfileSchema>;
export type EditProfileFormSchemaType = z.infer<typeof EditProfileSchema>;
export type RestoreProfileSchemaType = z.infer<typeof RestoreProfileSchema>;
export type ModDetailsEntitySchemaType = z.infer<typeof ModDetailsEntitySchema>;
