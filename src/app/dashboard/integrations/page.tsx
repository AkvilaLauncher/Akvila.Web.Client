import type { Metadata } from 'next';

import { IntegrationsPage } from '@/views/integrations';

export const metadata: Metadata = {
  title: 'Integrations',
};
const Page = async () => {
  return <IntegrationsPage />;
};
export default Page;
