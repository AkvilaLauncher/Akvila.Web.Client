import type { Metadata } from 'next';

import { PlayersPage } from '@/views/players';

export const metadata: Metadata = {
  title: 'Playes',
};

const Page = () => {
  return <PlayersPage />;
};

export default Page;
