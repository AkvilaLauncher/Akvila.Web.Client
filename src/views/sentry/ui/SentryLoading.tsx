import { DASHBOARD_PAGES } from '@/shared/routes';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export const SentryLoading = () => {
  return (
    <>
      <Breadcrumbs
        current={'Errors'}
        breadcrumbs={[{ value: 'Home', path: DASHBOARD_PAGES.HOME }]}
      />
      Loading...
    </>
  );
};
