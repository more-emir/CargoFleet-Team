import { lazy } from 'react';
import ForgotPasswordPage from './ForgotPasswordPage';
import { authRoles } from 'app/auth';

const ForgotPasswordPageConfig = {
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
      path: '/forgot-password',
      component: ForgotPasswordPage
    }
  ]
};

export default ForgotPasswordPageConfig;
