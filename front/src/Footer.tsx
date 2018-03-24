import * as React from 'react';
import { MuiTheme } from 'material-ui/styles';
import muiThemeable from 'material-ui/styles/muiThemeable';

const Footer: React.SFC<{ muiTheme?: MuiTheme }> = ({ muiTheme }) => (
  <footer
    style={{
      color: 'white',
      backgroundColor: muiTheme!.palette!.primary1Color,
      marginTop: '4em',
      padding: '.8em 0',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    Version: 0.2.3-SNAPSHOT
  </footer>
);

export default muiThemeable()(Footer);
