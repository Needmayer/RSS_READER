import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link, Redirect } from 'react-router';
import Menu from '../sidebar.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../../redux/actions/authActions.js';

class Login extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = { username: '#' };
        this.props.actions.login(this.state);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
    }

    redirectToSignUpPage() {
        browserHistory.push('/signup');
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            username: this.refs.user.value,
            password: this.refs.pass.value
        };

        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "include"
        }).then(resp => {
            return resp.json();
        }).then(body => {
            if (body.error) {
                this.setState({ error: body.error });
                return;
            }
            this.props.actions.login(body);
            return;
        });
    }

    render() {
        if (this.props.loginUser.logged) {
            return this.redirectToHomePage();
        }
        return (
            <div>
                <Menu />
                <div className="modal-dialog">
                    <div className="loginmodal-container">
                        <h1>Login to Your Account</h1><br />
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="user" placeholder="Username" ref="user" />
                            <input type="password" name="pass" placeholder="Password" ref="pass" />
                            {this.state.error && (
                                <div className="red">{this.state.error}</div>
                            )}
                            <input type="submit" name="login" className="login loginmodal-submit" value="Login" />
                        </form>
                        <div className="login-help">
                            <Link to="/signup" onClick={this.redirectToSignUpPage}>Register</Link> - <a href="#">Forgot Password </a>
                            - <Link to="/" onClick={this.redirectToHomePage}>Back to Home page</Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

Login.propTypes = {
    actions: PropTypes.object.isRequired,
    loginUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
