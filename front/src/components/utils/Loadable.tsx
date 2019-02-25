import * as React from 'react';

import { CircularProgress } from '@material-ui/core';

type Props = {
  loading: boolean;
  error?: string;
  children: React.ReactNode;
};

export default ({ children, error, loading }: Props) => (
  <>
    {loading && <CircularProgress />}
    {Boolean(error) && <span className="error">{error}</span>}
    {!loading && !Boolean(error) && children}
  </>
);