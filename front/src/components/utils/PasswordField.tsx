import * as React from 'react';

import { WrappedFieldProps } from 'redux-form';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default ({ id, input, label, meta: { touched, error }, ...custom }: WrappedFieldProps & PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <FormControl error={touched && error}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          {...input}
          id={id}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={e => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched && error &&
          <FormHelperText>
            {error}
          </FormHelperText>
        }
      </FormControl>
    </>
  );
};

interface PasswordInputProps {
  id: string;
  label: string;
}
