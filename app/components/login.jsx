import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchByName }  from '../actions/login.js';
import '../aasets/css/style.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.productList.isError) {
            this.setState({errorMessage: nextProps.productList.errorResponse});
        }
        
    }

    login(e) {
        let username = this.usernameField.value;
        let password = this.passwordField.value;
        let props =  this.props;
        e.preventDefault();
        this.props.dispatch(searchByName(username, password, props));
    }
    render(){
        return(
            <div id="loginPage">
                <h1 className="heading">Welcome to Star Wars App</h1>
               <form onSubmit={(e) => this.login(e)}>               
                    <div id="login">
                        <input type="text" id="email" placeholder="Username" ref={ (input) => { this.usernameField = input } }/>
                        <input type="password" id="password" placeholder="Password" ref={ (input) => { this.passwordField = input } }/>
                        <button id="send">Login</button>
                    </div>
                </form>
                <span className="error">
                    { this.state.errorMessage }
                </span>
            </div>
        )
    }
}

function mapStateToProps(state) { 
    return {
        productList: state.login
    };
};

Login.propTypes = {
  productList: PropTypes.object
};

export default connect(mapStateToProps)(Login);