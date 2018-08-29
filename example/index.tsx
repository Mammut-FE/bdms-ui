import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import Container from './app/Container';

if (window.location.pathname === '/layout') {
  ReactDOM.render(<Container />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}

