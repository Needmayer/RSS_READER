import React, {PropTypes} from 'react';
import { browserHistory, Redirect, Link } from 'react-router';
import Menu from '../sidebar.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../redux/actions/authActions.js';

class Signup extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            pass1: '',
            pass2: '',
            userExists: false,
            redirect: false,
            errMsg: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRefsValues = this.getRefsValues.bind(this);
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    handleSubmit(e) {
        e.preventDefault();
        let state = this.getRefsValues();

        if (state.pass1 !== state.pass2 || !state.username) {
            state.errMsg = 'Passwords do not match';
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
            if(body.errors && body.errors.password){
                state.userExists = false;               
                state.redirect = false; 
                state.errMsg = body.errors.password.msg;
                this.setState(state);
                return;
            }else if (body.error && body.error.code === 11000) {
                state.userExists = true;
                state.redirect = false;
                state.errMsg = 'This username allready exists';
                this.setState(state);
                return;
            } else {
                state.userExists = false;
                state.redirect = true;
                state.errMsg = '';
                this.props.actions.login(this.getLoginUserState(state));                
            }
        });
    }

    getRefsValues() {
        return {
            username: this.refs.user.value,
            pass1: this.refs.pass1.value,
            pass2: this.refs.pass2.value
        };
    }

    getLoginUserState(state) {
        return {
            username: state.username,
            categories: []
        };
    }

    render() {
        if (this.props.loginUser.redirect) {
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
                                <div className="red"> {this.state.errMsg}</div>
                            )}
                            <input type="password" name="pass" placeholder="Password" ref="pass1" />
                            <input type="password" name="pass" placeholder="Password" ref="pass2" />

                            {(!this.state.userExists && this.state.errMsg) && (
                                <div className="red">{this.state.errMsg}</div>
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


Signup.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);