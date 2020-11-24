import React from 'react';
import Button from '../Button';
import Header from '../Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="Stock" />

      <div className="Container">
        <Button onClick={() => window.alert('UIIIU')}>
          Alert
        </Button>
      </div>
    </div>
  );
}

export default App;
