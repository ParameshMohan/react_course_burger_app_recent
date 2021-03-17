import React,{ Component } from 'react';

const asyncComponent = ( importComponent ) => {
    return class extends Component {
        state = {
            component: null // this compoenent will be loaded with dynamically loaded comp in comDidMount method.
        }
        componentDidMount(){
            importComponent() // import is a function and it is a promise
                .then( cmp =>{
                    this.setState({ component: cmp.default})
                })
        }

        render (){
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;  