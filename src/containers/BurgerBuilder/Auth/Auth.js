import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import styles96 from './Auth.module.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updatedObject,checkValidity } from '../../../shared/utility';

class Auth extends Component {

    state = {
        controls:{
            email:{
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Mail Address'
                },
                value: '',
                validation :{
                    required:'true',
                    isEmail: true
                    },
                valid: false,
                touched: false
            } ,
            password:{
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder:'Password'
                },
                value: '',
                validation :{
                    required:'true',
                    minLength: 6
                    },
                valid: false,
                touched: false
            } 
        },
        isSignUp: true
    }

    inputChangeHandler =(event, controlName) =>{
        // console.log(controlName);
        const updatedControls =  updatedObject(this.state.controls, {
            [controlName]: updatedObject(this.state.controls[controlName], {
                value: event.target.value,// here onwards we are updating 
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }) 
        }) ;

        this.setState({ controls: updatedControls});
    }

    componentDidMount( ){
        if(!this.props.buildingBurger ){ // but he has used 
            //if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
            this.props.onSetAuthRedirectPath();
        }
    }
   

    submitHandler =(event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp)
    }

    switchAuthModeHandler = () =>{
        this.setState( prevState =>{
            return {isSignUp: !prevState.isSignUp};
        })
    } 

    render () {
        const formElementArray =[];
        for(let key in this.state.controls){
            // console.log(key);
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement =>(
            <Input
            key={ formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid= {!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event,formElement.id)}
            />
            
        ))
        if(this.props.loading ){
            form = <Spinner />
        }

        let errorMessage= null;
        if(this.props.error){
            errorMessage = (
            <p> {this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenicated){
            authRedirect = <Redirect to ={this.props.authRedirectPath} /> // if we are successfully auth , then redirect to path in suthRedirectPath
        }
        return (
            <div className={styles96.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={ this.submitHandler}>
                    {form}
                <Button btnType="Success">SUMBIT</Button>
                </form>

        <Button 
            clicked = {this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO { this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password, isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch (actions.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenicated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Auth);