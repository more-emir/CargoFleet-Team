import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { resetLoginWithFireBase } from 'app/auth/store/resetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { setUser } from '../../../../../auth/store/userSlice';

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter an email address')
});

const defaultValues = {
  email: ''
};

function FirebaseResetTab(props) {
  const history = useHistory();
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.reset);

  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const formRef = useRef(null);

// useEffect(() => {
//   login.errors.forEach(error => {
//     setError(error.type, {
//       type: 'manual',
//       message: error.message
//     });
//   });
  
//   return () => {
//     setError({});
//   };
// }, [login.errors, setError]);


  function onSubmit(model) {
    dispatch(resetLoginWithFireBase(model));
    dispatch(setUser({ data: model }));
    history.push('/pages/auth/mail-confirm');
  }

  return (
    <>
      <div className="w-full">
        <form
          name="recoverForm"
          noValidate
          className="flex flex-col justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label="Email"
                autoFocus
                type="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
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
            Send reset link
          </Button>
        </form>
      </div>
    </>
  );
}

export default FirebaseResetTab;