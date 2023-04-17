import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SettingsPage from './components/SettingsPage/SettingsPage';
import ViewPage from './components/ViewPage/ViewPage';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
      <Routes>
        <Route path='/' element={<ViewPage />} />
        <Route path='/view' element={<ViewPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
      </Container>
    </div>
  );
}

export default App;
