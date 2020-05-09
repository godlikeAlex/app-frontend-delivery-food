import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import Routes from './Routes';
import { ToastProvider } from 'react-toast-notifications'
import {AuthModal} from './components/profile';

function App() {
  return (
    <div className="App">
          <ToastProvider 
            placement="bottom-center"
            autoDismissTimeout={6000}
          > 
              <AuthModal />
              <Routes />
          </ToastProvider>
    </div>
  );
}

export default App;
