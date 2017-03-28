import React from 'react';
import './App.css';

import Header from './components/header/Header';
import ProductsList from './components/products/ProductsList';

const App = function App() {
  return (
    <div className="App">
      <Header />
      <ProductsList />
    </div>
  );
};
export default App;
