import React from 'react';

import styles8 from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={ styles8.NavigationItems}>
        
        <NavigationItem link ="/" exact> Burger Builder </NavigationItem>
       {props.isAuthenticated ?  <NavigationItem link ="/orders"> Orders  </NavigationItem> : null}
        { !props.isAuthenticated 
            ? <NavigationItem link ="/auth"> Authenticate  </NavigationItem>
            : <NavigationItem link ="/logout"> Logout </NavigationItem>}
    </ul>
);

export default navigationItems;