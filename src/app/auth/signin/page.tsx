import Image from 'next/image';
import Link from 'next/link';

import classes from './styles.module.css';

import { SignInForm } from '@/features/auth-credentials-form';
import { AUTH_PAGES } from '@/shared/routes';
import logo from '@/assets/logos/logo.svg';

export default function Page() {
  return (
    <>
      <div className={classes.login}>
        <div className={classes['login__main-content']}>
          <div className={classes.login__form}>
            <div className={classes.login__details}>
              <Image src={logo} className={classes.login__logo} alt="Akvila Frontend" />
              <h1 className={classes.login__title}>Authorization</h1>
              <p className={classes.login__subtitle}>
                Enter your username and password below to log in to your account
              </p>
            </div>
            <SignInForm />
            <div className={classes.login__registration}>
              No account?{' '}
              <Link href={AUTH_PAGES.SIGN_UP} className={classes.login__link}>
                Registration
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.login__banner}>
          <Image src={logo} className={classes['login__banner-image']} alt="Akvila Frontend" />
        </div>
      </div>
    </>
  );
}
