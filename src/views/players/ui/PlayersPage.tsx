'use client';

import { DASHBOARD_PAGES } from '@/shared/routes';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { PlayersTable } from '@/widgets/players-table/ui/PlayersTable';

export const PlayersPage = () => {
  return (
    <>
      <Breadcrumbs
        current={'Players'}
        breadcrumbs={[{ value: 'Home', path: DASHBOARD_PAGES.HOME }]}
      />

      <PlayersTable />
    </>
  );
};
