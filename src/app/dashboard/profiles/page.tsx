import type { Metadata } from 'next';

import { ProfilesPage } from '@/views/profiles';

export const metadata: Metadata = {
  title: 'Profiles',
};
const Page = async () => {
  return <ProfilesPage />;
};
export default Page;
