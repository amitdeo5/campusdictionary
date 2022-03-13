import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import SearchFilter from './Component/SearchFilter';

function App() {
  return (
    <>
    <Navbar/>
    <SearchFilter/>
    <Footer/>
    </>
  );
}

export default App;
