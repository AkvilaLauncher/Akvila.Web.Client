import { redirect } from 'next/navigation';

import { AUTH_PAGES } from '@/shared/routes';

export default function Home() {
  redirect(AUTH_PAGES.SIGN_IN);
}
