import React, { Component } from 'react';
import './App.css';

import Header from './components/header/Header.jsx';
import ProductsList from './components/products/ProductsList.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <ProductsList/>
      </div>
    );
  }
}

export default App;
