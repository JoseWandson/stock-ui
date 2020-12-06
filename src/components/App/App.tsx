import React from 'react';
import Container from '../../shared/Container';
import Table from '../../shared/Table';
import Header from '../Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="Stock" />

      <Container>
        <Table />
      </Container>
    </div>
  );
}

export default App;
