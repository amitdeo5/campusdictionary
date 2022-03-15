import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from './Component/Navbar';
import Fimage  from './Component/Fimage';
import Textarea  from './Component/Textarea';
import Footer from './Component/Footer';
import SearchFilter from './Component/SearchFilter';

function App() {
  return (
    <>
    <Navbar/>
    <Fimage/>
    <SearchFilter/>
    <Textarea/> 
    <Footer/>
    </>
  );
}

export default App;
