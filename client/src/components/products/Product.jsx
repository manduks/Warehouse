import React, { Component } from 'react';
import './Product.css';

import Formats from '../../helpers/Formats.js';

class Product extends Component {
  render() {
    const product = this.props;
    return (
        <div className="App-product">
          <div className="product-face" style={{fontSize: product.size}}>
            {product.face}
          </div>
          <div className="product-details">
            <span><b>Size:</b> {product.size} px</span>
            <span><b>Price:</b> {Formats.centsToDollars(product.price)}</span>
            <span><b>Date:</b>{Formats.timeAgo(product.date)}</span>
          </div>
        </div>
    );
  }
}

export default Product;
