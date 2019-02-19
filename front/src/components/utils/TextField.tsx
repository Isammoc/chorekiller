import * as React from 'react';

import { WrappedFieldProps } from 'redux-form';
import TextField from '@material-ui/core/TextField';

interface BasicProps {
  label: string;
}

export default ({ input, label, meta: { touched, error }, ...custom }: WrappedFieldProps & BasicProps) => (
  <TextField
    label={label}
    error={error}
    margin="dense"
    fullWidth={true}
    variant="standard"
    {...input}
    {...custom}
  />
);
