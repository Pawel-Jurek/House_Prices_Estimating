
import './App.css';
import React, { useState } from 'react';
import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
      
    </>
  );
}

export default App;
