import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { resetPasswordWithFireBase } from 'app/auth/store/confirmResetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter an email address')
});

const defaultValues = {
  email: ''
};

function FirebaseResetTab(props) {
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.reset);

  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const formRef = useRef(null);

  useEffect(() => {
    login.errors.forEach(error => {
      setError(error.type, {
        type: 'manual',
        message: error.message
      });
    });
  }, [login.errors, setError]);

  function onSubmit(model) {
    dispatch(resetPasswordWithFireBase(model.password));
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label="Email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      email
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          )}
        />
      </form>
    </div>
  );
}

export default FirebaseResetTab;