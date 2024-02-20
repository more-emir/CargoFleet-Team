import { lazy } from 'react';
import { authRoles } from 'app/auth';

const MailConfirmPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/pages/auth/mail-confirm',
      component: lazy(() => import('./MailConfirmPage'))
    }
  ]
};

export default MailConfirmPageConfig;