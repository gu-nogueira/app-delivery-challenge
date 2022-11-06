import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import history from './services/history';
import Routes from './routes';

import Modal from './components/Modal';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyle />
      <Modal />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={'colored'}
      />
    </Router>
  );
}

export default App;
