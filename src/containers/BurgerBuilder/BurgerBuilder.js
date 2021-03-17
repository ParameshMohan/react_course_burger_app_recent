import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }
    componentDidMount() {
       
        this.props.onInitIngredients();

    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];// basically becan = 0, numbers o each item . array of values
            })
            .reduce((sum, el) => {   // here we are using reduce to reduce to the single sum of ingredients. sum will be final result after the iteration of this function 
                return sum + el; // starting number is zero
            }, 0)
        return sum > 0; // purshable is true only when sum >0, means any one item is present
    }


    purchaseHandler = () => {
        if(this.props.isAuthenicated){
            this.setState({ purchasing: true });
        }
       else {
           this.props.onSetRedirectPath('/checkout')
           this.props.history.push('/auth');
       }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        // const queryParams =[]; // we want to add elements to this array . to do that we use for loop
        // for( let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) );// we are pushing each ingredient element. But we are encoding using a method so that the ingredients can be used in the url only
        //         // encodeURIComponent(i) is the name
        //         //encodeURIComponent(this.state.ingredients[i]) is the value
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&'); // each element should join with & sign 
        this.props.onInitPurchase();
        this.props.history.push('/checkout');// this will be the target url , how it should be --> we want those ingrdients list in the url only --> prepare the query here




    }
    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        //{salad:true,meat :false}
        let orderSummary = null;

        let burger = this.props.error ? <p> ingredients cannot be loaded!!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenicated}
                        price={this.props.price}

                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price} />;
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}

            </Auxiliary>
        );
    } // this is lifecycle method and it is must that what we want to render
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenicated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch (actions.purchaseInit()),
        onSetRedirectPath : (path) => dispatch (actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
