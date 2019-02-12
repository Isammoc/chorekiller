import * as React from 'react';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface PasswordInputProps {
  label: string;
  password: string;
  setPassword: (password: string) => void;
  error: boolean;
}

const PasswordInput: React.SFC<PasswordInputProps> =
  ({ error, label, password, setPassword }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <FormControl error={error}>
        <InputLabel htmlFor="old-password">{label}</InputLabel>
        <Input
          id="old-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </FormControl>
    );
  };

export default PasswordInput;