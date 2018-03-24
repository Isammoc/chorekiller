import * as React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as colorManipulator from 'material-ui/utils/colorManipulator';
import * as colors from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';

import Footer from './Footer';
import Ribbon from './Ribbon';
import Welcome from './Welcome';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.blueGrey500,
    primary2Color: colors.blueGrey700,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    secondaryTextColor: colorManipulator.fade(colors.darkBlack, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: colorManipulator.fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.cyan500,
    clockCircleColor: colorManipulator.fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack
  }
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Ribbon />
          <AppBar
            showMenuIconButton={false}
            title="Chorekiller"
            iconElementRight={<FlatButton label="Se connecter" icon={<ActionAccountCircle />} />}
          />
          <Welcome />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
