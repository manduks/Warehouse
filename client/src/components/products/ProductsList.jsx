import React, { Component } from 'react';

import Product from './Product.jsx';
import './ProductsList.css';
import Advertisement from '../advertisement/Advertisement.jsx';
import ButtonGroup from '../ButtonGroup.jsx';
import Ads from '../../helpers/Ads.js';
import API from '../../API.js';

class ProductsList extends Component {
  constructor() {
    super();
    this.filterProducts = this.filterProducts.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      products: []
    };
    this.params = {
      limit: 20,
      page: 1
    };
    this.products = [];
  }
  componentDidMount() {
    this.filterProducts();
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  filterProducts() {
    API.streamProducts(this.params, (product) => {
      this.products.push(product);
      this.setState({
        products: this.products
      });
    });
  }
  renderProducts() {
    let productsAndAds = [];
    let addNumber;
    this.state.products.forEach((p, i) => {
      productsAndAds.push(<Product key={p.id} {...p}/>);
      if (((i + 1) % Ads.insertEach === 0)) {
        addNumber = Ads.generateRandomAdd();
        if (addNumber !== -1) {
          productsAndAds.push(<Advertisement key={addNumber} ad={addNumber}/>);
        }
      }
    });
    return productsAndAds;
  }
  handleFilter(text) {
    this.products = [];
    this.params.sort = text;
    Ads.reset();
    this.filterProducts();
  }
  handleScroll() {
    const params = this.params;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.params.skip = params.limit * params.page;
      this.params.page += 1;
      this.filterProducts();
    }
  }
  render() {
    return (
        <section className="App-products-list" onScroll={this.handleScroll}>
          <div  className="App-products-filters">
             <ButtonGroup buttons={['Size', 'Price', 'Id']} onClick={this.handleFilter}/>
          </div>
          {this.renderProducts()}
        </section>
    );
  }
}

export default ProductsList;
