import React, { PropTypes } from 'react';
import {browserHistory, Link} from 'react-router';


class Menu extends React.Component{

    redirectToLoginPage() {
        browserHistory.push('/login');
    }

    redirectToSignUpPage() {
        browserHistory.push('/signup');
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    render(){
        return(
            <nav className="nav-sidebar pull-right">
                <ul className="nav">
                    <li className="active"><Link to="/" onClick={this.redirectToHomePage}>Home</Link></li>
                    <li><Link to="/rssDialog">Add RSS</Link></li>
                    <li><Link to="/login" onClick={this.redirectToLoginPage}><i className="glyphicon glyphicon-log-in"></i> Login</Link></li>
                    <li><Link to="/signup" onClick={this.redirectToSignUpPage}><i className="glyphicon glyphicon-off"></i> Signup</Link></li>
                </ul>
            </nav>
        );
    }


}

export default Menu;