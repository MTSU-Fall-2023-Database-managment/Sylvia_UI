import React from 'react';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import GetData from './components/pages/GetData';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/analytics" element={<Home/>} />
        <Route path="/news" element={<Home/>} />
        <Route path="/reviews" element={<Home/>} />
        <Route path="/getdata" element={<GetData/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
