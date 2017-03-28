import React from 'react';
import { mount } from 'enzyme';
import ProductsList from '../src/components/products/ProductsList';

describe('List Products', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ProductsList />);
  });

  describe('and API returns results', () => {
    const products = [
      {
        id: '0-whlja0knxxs7dz6mx2u1h5mi',
        size: 27,
        price: 25,
        face: '( .-. )',
        date: 'Fri Mar 17 2017 03:46:56 GMT-0600 (CST)',
      },

      {
        id: '3-08iiwxmxwbgrjzzubhso22zkt9',
        size: 34,
        price: 946,
        face: '( Â° Í Ê Â°)',
        date: 'Sun Mar 19 2017 02:18:38 GMT-0600 (CST)',
      },
    ];
    beforeEach(() => {
      wrapper.setState({
        products,
      });
    });


    it('should display filter', () => {
      expect(wrapper.html()).toContain('Price');
    });

    it('should set the state property `products`', () => {
      expect(wrapper.state().products).toEqual(products);
    });

    it('should display two products', () => {
      expect(wrapper.find('.App-product').length).toEqual(2);
    });

    it('should render the emoji of first product', () => {
      expect(wrapper.html()).toContain(products[0].face);
    });

    it('should render the emoji of second product', () => {
      expect(wrapper.html()).toContain(products[1].face);
    });
  });
});
