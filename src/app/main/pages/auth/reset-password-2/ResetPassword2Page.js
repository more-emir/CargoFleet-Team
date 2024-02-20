import { lazy } from 'react';
import { authRoles } from 'app/auth';

const ResetPassword2PageConfig = {
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
      path: '/pages/auth/reset-password-2',
      component: lazy(() => import('./ResetPassword2Page'))
    }
  ]
};

export default ResetPassword2PageConfig;