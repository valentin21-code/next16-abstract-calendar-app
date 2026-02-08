import {useTranslations} from 'next-intl';

import {loginAction} from '@/app/actions/auth';

import {AppTopbar} from '@/components/sections/AppTopbar';
import {ThemeSwitcher} from '@/components/sections/ThemeSwitcher';
import {LanguageSwitcher} from '@/components/sections/LanguageSwitcher';
import {Form} from '@/components/sections/Form';

import {Button} from '@/components/simple/Button';
import {TextInput} from '@/components/simple/TextInput';

/*
Login page.

This is a demo login:
- Any email/password will set a cookie.
- Real auth should replace src/lib/auth.ts and src/app/actions/auth.ts
*/

export default function LoginPage() {
  const t = useTranslations();

  return (
    <div className="container">
      <AppTopbar
        right={
          <>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </>
        }
      />

      <div className="card loginCard">
        <h1 className="h1">{t('login.title')}</h1>

        <Form action={loginAction} className="formGrid">
          <TextInput name="email" label={t('login.email')} type="email" required />
          <TextInput name="password" label={t('login.password')} type="password" required />

          <div className="row">
            <Button type="submit" variant="primary">
              {t('login.submit')}
            </Button>
            <div className="spacer" />
            <p className="small">Demo auth (cookie)</p>
          </div>
        </Form>
      </div>
    </div>
  );
}
