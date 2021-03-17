import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BugerBuilder, BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter()});

describe('<BugerBuilder />', () =>{
   let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<BurgerBuilder onInitIngredients= {() => {}}/>); // why are we passing empty func
        // may be onInitIngredients is a funct and we need to pass a func
    })
    
    it('should render <BuildControls /> when receiving ingredients', () =>{
        wrapper.setProps({ings: {cheese:1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
});