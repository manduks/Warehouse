import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import ButtonGroup from '../ButtonGroup';
import Product from './Product';
import './ProductsList.css';
import Advertisement from '../advertisement/Advertisement';
import API from '../../API';
import Ads from '../../helpers/Ads';
import Formats from '../../helpers/Formats';
import LoadingBar from '../LoadingBar';

class ProductsList extends Component {
  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
    this.loadMoreProducts = this.loadMoreProducts.bind(this);
    this.startLazyLoading = this.startLazyLoading.bind(this);
    this.state = {
      products: [],
      isLoading: true,
      noMore: false,
      temp: [],
      timestamp: null,
    };
    // params for pagination
    this.params = {
      limit: 20,
      page: 1,
    };
  }
  componentDidMount() {
    this.filterProducts();
    // lazy loading
    this.startLazyLoading();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  /**
   * lazy loaign implementation
   */
  startLazyLoading() {
    this.interval = setInterval(
      () => {
        if (Formats.secondsPast(this.state.timestamp) >= 50) {
          this.loadMoreProducts(null, true);
        }
      },
      5 + 10000,
    );
  }
  loadMoreProducts(cpm, lazy = false) {
    const params = this.params;
    const temp = this.state.temp;

    if (!lazy && temp.length) { // we load cached products
      return this.setState({
        products: this.state.products.concat(temp),
        temp: [],
      });
    }

    this.params.skip = params.limit * params.page;
    this.params.page += 1;

    return this.filterProducts(lazy);
  }
  /**
   * Filter products and fetch the serverside
   */
  filterProducts(lazy) {
    const products = lazy ? this.state.temp : this.state.products;

    if (!lazy) {
      this.setState({ isLoading: true, timestamp: new Date() });
    }

    if (this.state.temp.length) {
      return false;
    }

    API.streamProducts(this.params, (product) => {
      const stateTemp = {
        isLoading: false,
      };
      if (Object.keys(product).length === 0 && product.constructor === Object) {
        stateTemp.noMore = true;
        return this.setState(stateTemp);
      }
      products.push(product);

      stateTemp[lazy ? 'temp' : 'products'] = products;

      return this.setState(stateTemp);
    });

    return true;
  }
  handleFilter(text) {
    this.params.sort = text;
    this.params.page = 1;

    // we reset the ads to show them again
    Ads.reset();
    window.scrollTo(0, 0);

    this.setState(
      {
        products: [],
      },
      this.filterProducts,
    );
  }

  /**
   * @return {Object}
   */
  renderProducts() {
    const productsAndAds = [];
    let addNumber;
    let products = this.state.products;

    if (!products.length) {
      products = API.getEmptyList();
    }

    products.forEach((p, i) => {
      productsAndAds.push(<Product key={p.id} {...p} />);
      if ((i + 1) % Ads.insertEach === 0) {
        addNumber = Ads.generateRandomAdd();
        if (addNumber !== -1) {
          productsAndAds.push(<Advertisement key={addNumber} ad={addNumber} />);
        }
      }
    });

    return productsAndAds;
  }
  /**
   * @return {Object}
   */
  renderWaypoint() {
    // we dont render Waypoint the firt products load
    if (!this.state.isLoading && this.state.products.length >= this.params.limit) {
      return <Waypoint scrollableAncestor={window} onEnter={this.loadMoreProducts} />;
    }
    return <LoadingBar />;
  }
  /**
   * @return {Object}
   */
  render() {
    return (
      <section className="App-products-list">
        <div className="App-products-filters">
          <ButtonGroup buttons={['Size', 'Price', 'Id']} onClick={this.handleFilter} />
        </div>
        {this.renderProducts()}
        {this.state.noMore
          ? <div className="end-of-list">
              ~ end of catalogue ~
          </div>
          : this.renderWaypoint()}
      </section>
    );
  }
}

export default ProductsList;
