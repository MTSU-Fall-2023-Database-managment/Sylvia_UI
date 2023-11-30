import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import GetData from './components/pages/GetData';
import ReviewPage from './components/pages/Reviews';
import News from './components/pages/News';
import Analytics from './components/pages/Analytics';
import Dash from './components/pages/Dash';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<GetData/>} />
        <Route path="/dashboard" element={<Dash/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/reviews" element={<ReviewPage/>} />
        <Route path="/getdata" element={<GetData/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
