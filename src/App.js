import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import Header from './components/header';
import Restaurants from './components/restaurants';

function App() {
  return (
    <div className="App">
        <Header />
        <Restaurants />
    </div>
  );
}

export default App;
