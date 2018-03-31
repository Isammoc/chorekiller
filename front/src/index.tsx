import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './app/utils/registerServiceWorker';
import './index.css';

const rootEl = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <App />,
  rootEl
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}
