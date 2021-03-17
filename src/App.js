import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/BurgerBuilder/Checkout/Checkout'; we are passing it azily
// import Orders from './containers/BurgerBuilder/Orders/Orders';
// import Auth from './containers/BurgerBuilder/Auth/Auth';
import Logout from './containers/BurgerBuilder/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(( ) =>{ // we are not passing comp -->for this asyncCompoent we need to return a function itself, hence we are writing anonymous fun with inside which we are imoorting a comp.
  return import ('./containers/BurgerBuilder/Checkout/Checkout'); // may be comp is imported and passed to hoc 
});

const asyncOrders = asyncComponent(( ) =>{
  return import ('./containers/BurgerBuilder/Orders/Orders');
});

const asyncAuth= asyncComponent(( ) =>{
  return import ('./containers/BurgerBuilder/Auth/Auth');
});

// import './App.css';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to={"/"} />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to={"/"} />
        </Switch>
      );
    }

  
   
    return (
      <div>

         <Layout>
          {routes}
        </Layout>
    


      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDisptachtoProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStatetoProps, mapDisptachtoProps)(App));
