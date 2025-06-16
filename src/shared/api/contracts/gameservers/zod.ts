import { z } from 'zod';

export const AddGameServerScheme = z.object({
  name: z.string().min(1, { message: 'You have not filled in the field' }),
  address: z.string().min(1, { message: 'You have not filled in the field' }),
  port: z.number({ invalid_type_error: 'You have not filled in the field' }),
});

export type AddGameServerSchemeType = z.infer<typeof AddGameServerScheme>;
