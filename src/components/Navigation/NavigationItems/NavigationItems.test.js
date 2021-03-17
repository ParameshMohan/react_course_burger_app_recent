import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter()}); // pass js object to configure funct, there we need to setup a adapter property and assign new ADapter constructor funct for it. 
// by this enzyme is connected. 

//jest give methods
// descrile is function which takes 2 aruguments and automatically present
//1st arugment is the a description of the test bunble it holds.This is the one which we see in the console.log for the user to know the error.
//2nd arugment is the testing function --> we are gone write the actaul test.
// it is another fnction present, it has 2 args. 1st arg is againa string descriptionwhich will appear onthe console.
// we want to here , when we are un auth --> 2 navigation item elements should be displayed. 
describe('<NavigationItems />', () =>{
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('should render two <NavigationItem/> elements if not authenticated', () =>{
         expect(wrapper.find(NavigationItem)).toHaveLength(2); 
     
    });

    it('should render three <NavigationItem/> elements if authenticated', () =>{
      //  wrapper = shallow(<NavigationItems isAuthenticated />);
      wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3); 
    });

    it('should an exact logout button', () =>{
       wrapper.setProps({isAuthenticated: true})
       expect(wrapper.contains(<NavigationItem link ="/logout"> Logout </NavigationItem>)).toEqual(true); 
      });
});