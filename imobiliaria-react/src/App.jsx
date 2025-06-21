import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <main> 
        <HomePage />
      </main>
      <Footer /> 
    </div>
  );
}

export default App;