import React from 'react';
import { browserHistory, Redirect, Link } from 'react-router';
import Menu from '../sidebar.js';

class Signup extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            pass1: '',
            pass2: '',
            userExists: false,
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    handleSubmit(e) {
        e.preventDefault();
        let state = {
            username: this.refs.user.value,
            pass1: this.refs.pass1.value,
            pass2: this.refs.pass2.value
        };

        if (state.pass1 !== state.pass2 || !state.username) {
            this.setState(state);
            return;
        }

        fetch('api/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: state.username,
                password: state.pass1
            }),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(resp => {
            return resp.json();
        }).then(body => {
            if (body.error.code === 11000) {
                state.userExists = true;
                state.redirect = false;
                this.redirectToHomePage();
            } else {
                state.userExists = false;
                state.redirect = true;
            }
            this.setState(state);
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
                        <h1>Create new account</h1><br />
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="user" placeholder="Username" ref="user" />
                            {(this.state.username !== null && !this.state.username) && (
                                <div className="red"> Fill the Username please </div>
                            )}
                            {this.state.userExists && (
                                <div className="red"> This username allready exists </div>
                            )}
                            <input type="password" name="pass" placeholder="Password" ref="pass1" />
                            <input type="password" name="pass" placeholder="Password" ref="pass2" />
                            {this.state.pass1 !== this.state.pass2 && (
                                <div className="red"> Passwords do not match </div>
                            )}
                            <input type="submit" name="signup" className="login loginmodal-submit" value="Signup" />
                            <Link to="/" className="text-info" onClick={this.redirectToHomePage}>Back to home page</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;