import React, { Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { 
            return  {showSideDrawer: !prevState.showSideDrawer} }
            );
    }
    render () {
        return (
            <Auxiliary>
            <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked = { this.sideDrawerToggleHandler } />
            <SideDrawer
                isAuth={this.props.isAuthenticated}
                open ={this.state.showSideDrawer}
                closed={ this.sideDrawerClosedHandler} />

             {/* we will be replacing these 3 with their comp */}
                <main className = "Content"> 
                 {this.props.children}

                 
                </main>
    </Auxiliary>
        );

    }
} 

const mapStatoToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null // we are comparing toke to not null
    };
};

    export default connect(mapStatoToProps) (Layout);