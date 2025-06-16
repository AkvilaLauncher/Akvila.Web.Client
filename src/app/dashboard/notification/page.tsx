import type { Metadata } from 'next';

import { NotificationPage } from '@/views/notification';

export const metadata: Metadata = {
  title: 'Notifications',
};

const Page = () => {
  return <NotificationPage />;
};

export default Page;
