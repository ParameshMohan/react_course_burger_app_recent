import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    // componentWillMount () {
    //     this.props.onInitPurchase();
    // }
    // state = {
    //     ingredients:null,
    //     price:0
    // }
    // componentWillMount() {
    //     //we need parse the elements here in checkout.js
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price =0;
    //     for(let param of query.entries()){
    //         // each element will have the below format 
    //         //['salad', '1']
    //         if(param[0] === 'price'){
    //             price=param[1];
    //         }
    //         else{
    //             ingredients[param[0]]= +param[1]
    //         }

    //     }
    //     this.setState({ ingredients : ingredients, totalPrice: price})
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack(); // this goBack method will simply go back tp last page
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');

    }
    render() {
        let summary = <Redirect to="/" />
        
        if (this.props.ings) {
            const purchasedRedirect= this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return  summary;
      
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased

    }
};

// we have nothing to doispatch here, becoz we are just navigation to another page which is done by routers

export default connect(mapStateToProps)(Checkout);