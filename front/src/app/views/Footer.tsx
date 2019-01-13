import * as React from 'react';
import { withStyles, Theme, StyleRulesCallback, WithStyles } from '@material-ui/core';

const styles: StyleRulesCallback<'footer'> = (theme: Theme) => ({
  footer: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    marginTop: '4em',
    padding: '.8em 0',
    display: 'flex',
    justifyContent: 'center',
  }
});

const Footer: React.SFC<WithStyles<'footer'>> = ({ classes }) => (
  <footer className={classes!.footer}>
    Version: 0.2.3-SNAPSHOT
  </footer>
);

export default withStyles(styles)(Footer);
