import type { Metadata } from 'next';

import { SettingsPage } from '@/views/settings';

export const metadata: Metadata = {
  title: 'Settings',
};
const Page = async () => {
  return <SettingsPage />;
};
export default Page;
