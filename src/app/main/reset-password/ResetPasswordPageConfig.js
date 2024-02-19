import { lazy } from 'react';
import { authRoles } from 'app/auth';
import ResetPasswordPage from './ResetPasswordPage';

const ResetPasswordPageConfig = {
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
      path: '/reset-password',
      component: ResetPasswordPage
    }
  ]
};

export default ResetPasswordPageConfig;
