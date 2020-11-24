import React from 'react';
import Button from '../../shared/Button';
import Container from '../../shared/Container';
import Header from '../Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="Stock" />

      <Container>
        <Button onClick={() => window.alert('UIIIU')}>
          Alert
        </Button>
      </Container>
    </div>
  );
}

export default App;
