import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as yup from 'yup';
import FirebaseForgotTab from './tab/FireBaseForgotTab';

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText
  },
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText
  }
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter an email address')
});

const defaultValues = {
  email: ''
};

function ForgotPasswordPage() {
  const classes = useStyles();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className={clsx(classes.leftSection, 'flex flex-col w-full max-w-sm items-center justify-center shadow-0')}
        >
          <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
            <img className="w-128 m-32" src="https://cargofleet.org/assets/img/logo.png" alt="logo" />

            <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
              Recover your password
            </Typography>
            <FirebaseForgotTab />
            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <Link className="font-normal" to="/login">
                Go back to login
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
          <div className="max-w-320">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
              <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
                Welcome <br />
                to the <br /> Cargofleet!
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                We help organizations track, analyze and improve their fleet operations.
              </Typography>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
