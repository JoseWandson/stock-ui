import React, { useState } from 'react';
import Button from '../../shared/Button';
import Container from '../../shared/Container';
import Input from '../../shared/Input';
import Header from '../Header';
import './App.css';

function App() {
  const [street, setStreet] = useState('');

  return (
    <div className="App">
      <Header title="Stock" />

      <Container>
        <Button onClick={() => window.alert('UIIIU')}>
          Alert
        </Button>
        <Input label="Street" placeholder="E.g.: 15h Avenue" value={street} onChange={e => setStreet(e.target.value)} />
      </Container>
    </div>
  );
}

export default App;
