import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Container from './Container';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

if (module.hot) {
  module.hot.accept();
}
if (window.location.pathname === '/layout') {
  ReactDOM.render(<Container />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}

registerServiceWorker();
