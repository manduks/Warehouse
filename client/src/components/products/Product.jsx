import React, { Component } from 'react';
import './Product.css';
import Formats from '../../helpers/Formats';

class Product extends Component {
  renderTemplate() { // eslint-disable-line class-methods-use-this
    return (
      <div className="App-product">
        <div className="product-face-empty" />
        <div className="product-details-empty" />
      </div>
    );
  }
  renderProduct() {
    const product = this.props;
    return (
      <div className="App-product">
        <div className="product-face" style={{ fontSize: product.size }}>
          {product.face}
        </div>
        <div className="product-details">
          <span><b>Size:</b> {product.size}px</span>
          <span><b>Price:</b> {Formats.centsToDollars(product.price)}</span>
          <span><b>Date:</b>{Formats.timeAgo(product.date)}</span>
        </div>
      </div>
    );
  }
  render() {
    return (this.props.face === 'no-face') ? this.renderTemplate() : this.renderProduct();
  }
}
Product.propTypes = {
  face: React.PropTypes.string.isRequired,
};

export default Product;
