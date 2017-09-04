import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Menu extends React.Component {

    redirectToLoginPage() {
        browserHistory.push('/login');
    }

    redirectToSignUpPage() {
        browserHistory.push('/signup');
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    signOut() {

    }

    render() {
        return (
            <nav className="nav-sidebar pull-right">
                <ul className="nav">
                    <li className="active"><Link to="/" onClick={this.redirectToHomePage}>Home</Link></li>
                    {(this.props.loginUser.username && this.props.loginUser.username !== '#') && (
                        <div>
                            <li><Link to="/rssDialog">Manage RSS</Link></li>
                            <li className="nav-li">Categories</li>
                            <div className="menu-categories">
                                {this.props.loginUser.categories.map((item,index) => {
                                    if(item.categoryTitle){
                                        return <li key={index} className="nav-li">{item.categoryTitle}</li>;
                                    }                                    
                                })
                                }
                            </div>
                            <li><Link to="/" onClick={this.signOut}><i className="glyphicon glyphicon-off"></i> Sign Out</Link></li>
                        </div>
                    )}
                    {(!this.props.loginUser.username || this.props.loginUser.username === '#') && (
                        <div>
                            <li><Link to="/login" onClick={this.redirectToLoginPage}><i className="glyphicon glyphicon-log-in"></i> Login</Link></li>
                            <li><Link to="/signup" onClick={this.redirectToSignUpPage}><i className="glyphicon glyphicon-off"></i> Sign Up</Link></li>
                        </div>
                    )}
                </ul>
            </nav>
        );
    }


}

Menu.propTypes = {
    loginUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    };
}

export default connect(mapStateToProps)(Menu);