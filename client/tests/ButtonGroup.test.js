// Link.react-test.js
import React from 'react';
import ButtonGroup from '../src/components/ButtonGroup';
import {shallow} from 'enzyme';

it('has text for all buttons', () => {
  const component = shallow(
    <ButtonGroup buttons={['Size', 'Price', 'Id']} onClick={() => {}} />,
  );
  expect(component.text()).toEqual('SizePriceId');
});
