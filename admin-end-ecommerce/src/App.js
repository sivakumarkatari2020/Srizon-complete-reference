import React from 'react';
import {Routes , Route ,Navigate} from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate replace to="/login" />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;