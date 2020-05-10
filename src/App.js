import React, {useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css'
import Routes from './Routes';
import { ToastProvider } from 'react-toast-notifications'
import {AuthModal} from './components/profile';
import MapSelector from './components/location/map';
import { connect } from 'react-redux';

function App({openLocation}) {
  useEffect(() => {
      document.body.style.overflowY = openLocation ? 'hidden' : 'scroll';
  }, [openLocation]);

  return (
    <div className="App">
          <ToastProvider 
            placement="bottom-center"
            autoDismissTimeout={6000}
          > 
              <AuthModal />
              <Routes />
              <div className='location-modal' style={{display: openLocation ? 'block' : 'none'}}>
                <MapSelector />
              </div>
          </ToastProvider>
    </div>
  );
}

const mapStateToProps = ({openLocation}) => {
  return {
    openLocation
  }
}

export default connect(mapStateToProps)(App);
