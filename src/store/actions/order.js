import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess= (id, orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed = (error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart =() =>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) =>{
 return dispatch =>{
     dispatch (purchaseBurgerStart());
 
    axios.post('/orders.json?auth='+ token, orderData)
        .then( response => {
       
       dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch( error => {
       dispatch( purchaseBurgerFailed(error) );
    });
};
};

export const purchaseInit = ()  => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFailed = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) =>{ // we are accessing token when fetchOrders is called.
    return dispatch =>{
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId +'"';// the userId by which we are identifying the order has to be in ""  and since userId is string, the last userId value should also be in ""
    axios.get('/orders.json' + queryParams)
    .then( res =>{
        const fetchOrders = []; //we are copying the result array  into an fetchorders array
        for( let key in res.data){
            fetchOrders.push({
                ...res.data[key],
                id: key
            });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
    })
    .catch(err =>{
       dispatch(fetchOrdersFailed(err))
    });
}
}