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
            username: "#"
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
        if (state.pass1 !== state.pass2) {
            state.error = 'Passwords do not match';
            this.props.actions.login(state);
            return;
        }

        fetch('api/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: state.username,
                password: state.pass1,
                password2: state.pass2
            }),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(resp => {
            return resp.json();
        }).then(body => {
            if(body.error){
                this.setState({error: body.error, username: state.username});
            }
            let userState = this.getUserState(body);            
            this.props.actions.login(userState);  
        });
    }

    getRefsValues() {
        return {
            username: this.refs.user.value,
            pass1: this.refs.pass1.value,
            pass2: this.refs.pass2.value
        };
    }

    getUserState(body) {
        return {
            username: body.username,
            categories: [{
                categoryTitle: "",
                categoryUrls: [""]
            }],
            logged: body.logged
        };
    }

    render() {
        const user = this.props.loginUser;
        const {error, username} = this.state;

        if (user.logged) {
            return this.redirectToHomePage();
        }
        return (
            <div>
                <Menu />
                <div className="modal-dialog">
                    <div className="loginmodal-container">
                        <h1>Create new account</h1><br />
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="user" placeholder="Username" ref="user" />
                            {(!username) && (
                                <div className="red"> Fill the Username please </div>
                            )}                                                        
                            <input type="password" name="pass" placeholder="Password" ref="pass1" />
                            <input type="password" name="pass" placeholder="Password" ref="pass2" />
                            
                            {(error) && (
                                <div className="red">{error}</div>
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