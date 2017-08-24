import React, { PropTypes } from 'react';
import { browserHistory, Link, Redirect } from 'react-router';
import Menu from '../sidebar.js';

class Login extends React.Component {

    constructor() {
        super();
        this.state = { username: '#' };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(resp => {
            return resp.json();
        }).then(body => {
            console.log(body);
            
            if (body) {
                body.redirect = true;
                this.redirectToHomePage();
                this.setState(body);
            } else {
                this.setState({ username: '' });
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/" />;
        }
        return (
            <div>
                <Menu />
                <div className="modal-dialog">
                    <div className="loginmodal-container">
                        <h1>Login to Your Account</h1><br />
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="user" placeholder="Username" ref="user" />
                            {!this.state.username && (
                                <div className="red"> Invalid Username or password </div>
                            )}
                            <input type="password" name="pass" placeholder="Password" ref="pass" />
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


export default Login;
