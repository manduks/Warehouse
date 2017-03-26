import React, { Component } from 'react';

import Product from './Product.jsx';
import Advertisement from '../advertisement/Advertisement.jsx';
import API from '../../API.js';
import './ProductsList.css';

class ProductsList extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    let products = [];
    API.streamProducts(null, (product) => {
      products.push(product);
      this.setState({
        products: products
      });
      console.log(products.length);
    });
  }
  renderProducts() {
    let productsAndAds = [];
    this.state.products.forEach((p, i) => {
      productsAndAds.push(<Product key={p.id} {...p}/>);
      if ((i + 1) % 20 === 0) {
        productsAndAds.push(<Advertisement/>);
      }
    });
    return productsAndAds;
  }
  render() {
    return (
        <section className="App-products-list">
          {this.renderProducts()}
        </section>
    );
  }
}

export default ProductsList;
