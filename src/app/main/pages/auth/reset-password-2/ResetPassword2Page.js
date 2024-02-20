import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { resetPasswordWithFireBase } from 'app/auth/store/confirmResetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
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
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
  password: '',
  passwordConfirm: ''
};

function ResetPasswordPage2(props) {
  const [resetPassword, setResetPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const confirm = useSelector(({ auth }) => auth.confirm);
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  console.log(query.get('mode'));
  console.log(query.get('oobCode'));

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(model) {
    setResetPassword(true);
    dispatch(resetPasswordWithFireBase(query.get('oobCode'), model.password));
  }

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <img className="w-128 m-32" src="https://cargofleet.us/assets/img/logo.png" alt="logo" />

              <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                Reset your password
              </Typography>

              {resetPassword ? (
                <Typography className="text-center w-full mb-24 text-16 sm:text-18" color="textSecondary" variant="h6">
                  Your password has been updated. You can now{' '}
                  <Link className="font-normal" to="/login">
                    login
                  </Link>{' '}
                  into your account.
                </Typography>
              ) : (
                <>
                  <form
                    name="resetForm"
                    noValidate
                    className="flex flex-col justify-center w-full"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Password"
                          type="password"
                          name="password"
                          error={!!errors.password}
                          helperText={errors?.password?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="passwordConfirm"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Password (Confirm)"
                          type="password"
                          error={!!errors.passwordConfirm}
                          helperText={errors?.passwordConfirm?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      className="w-224 mx-auto mt-16"
                      aria-label="Reset"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                    >
                      Reset my password
                    </Button>
                  </form>

                  <div className="flex flex-col items-center justify-center pt-32 pb-24">
                    <Link className="font-normal" to="/login">
                      Go back to login
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default ResetPasswordPage2;
