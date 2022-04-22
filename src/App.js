import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App