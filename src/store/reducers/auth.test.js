//we dont need enzyme since we are not testing any react components.
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () =>{
    it('should return the init state', () =>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath:'/'
        })
    })

    it(' should store token upon login ', () => {
        expect(reducer({
            token:null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath:'/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some'
        })).toEqual({
            token:'some-token',// this should match with idToken
            userId:'some-userId', // this should match with userID
            error: null,
            loading: false,
            authRedirectPath:'/' 
        })
    })
});