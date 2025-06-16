import { z } from 'zod';

export const ClientBuildSchema = z.object({
  version: z
    .string()
    .min(1, { message: "You haven't selected a version" })
    .transform((v) => v.trim()),
  operatingSystem: z.array(z.string().min(1)).min(1).nonempty('Select at least one platform'),
});

export type ClientBuildFormSchemaType = z.infer<typeof ClientBuildSchema>;
