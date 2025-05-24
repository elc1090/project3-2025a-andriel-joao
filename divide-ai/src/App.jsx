import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from './pages/auth';
import Home from './pages/home';
import NoPage from './pages/nopage';
import QrCode from './pages/qrcode';
import Table from './pages/table';
import Profile from './pages/profile';
import Notas from './pages/notas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/tabela" element={<Table />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/notas" element={<Notas />}/>
        {/* Rota coringa para páginas não encontradas */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
