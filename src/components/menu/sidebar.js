import React from 'react';
import PropTypes from 'prop-types';

import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/actions/authActions.js';
import * as tabActions from '../../redux/actions/tabActions.js';
import toastr from 'toastr';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classNav: "nav out"
        };
        this.filterCategory = this.filterCategory.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.logout = this.logout.bind(this);
    }

    redirectToLoginPage() {
        browserHistory.push('/login');
    }

    redirectToSignUpPage() {
        browserHistory.push('/signup');
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    filterCategory(event) {
        let filter = event.target.name;        
        this.props.actions.updateCategoryFilter({filter});
        this.redirectToHomePage();                
    }

    async logout() {
        fetch('api/logout', {
            credentials: "include"
        }).then(resp => {
            return resp.json();
        }).then(response => {
            if (!response.error) {
                toastr.success('You where succesfully logout.');
                setTimeout(() => {
                    this.props.actions.logout({ username: "#", logged: false, categories: [""] });
                    this.props.actions.deleteAllItems();
                    return this.redirectToHomePage();
                }, 500);

            } else {
                toastr.error("error occured.");
                return;
            }
        }).catch(error => {
            return Promise.reject(Error(error.message));
        });

    }
    toggleVisibility(){
        let classNav = this.state.classNav == "nav in" ? "nav out" : "nav in";
        console.log("toggle " + classNav );
        
        this.setState({classNav});
    }

    render() {
        const user = this.props.loginUser;
        return (
            <nav className="nav-sidebar pull-right">
                <div className="icon-sidebar-menu" onClick={this.toggleVisibility}><i className="glyphicon glyphicon-menu-hamburger pull-left"></i></div>
                <ul className={this.state.classNav}>
                    <li className="active"><Link to="/" onClick={this.redirectToHomePage}>Home</Link></li>
                    {(user.username && user.username !== '#') && (
                        <div>
                            <li><Link to="/rssDialog">Manage RSS</Link></li>
                            <a href="#" onClick={this.filterCategory}>Categories</a>
                            <div className="menu-categories">
                                {user.categories.map((item, index) => {
                                    if (item.categoryTitle) {
                                        return <a href="#"
                                            style={this.props.loginUser.filter == item.categoryTitle ? { backgroundColor: "#EDEDED" } : undefined}
                                            key={index} className="nav-li"
                                            onClick={this.filterCategory}
                                            name={item.categoryTitle}>{item.categoryTitle}</a>;
                                    }
                                })
                                }
                            </div>
                            <li><Link to="/" onClick={this.logout}><i className="glyphicon glyphicon-off"></i> Logout</Link></li>
                        </div>
                    )}
                    {(!user.username || user.username === '#') && (
                        <div>
                            <li><Link to="/login" onClick={this.redirectToLoginPage}><i className="glyphicon glyphicon-log-in"></i> Login</Link></li>
                            <li><Link to="/signup" onClick={this.redirectToSignUpPage}><i className="glyphicon glyphicon-off"></i> Sign up</Link></li>
                        </div>
                    )}
                </ul>
            </nav>
        );
    }


}

Menu.propTypes = {
    loginUser: PropTypes.object.isRequired,
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...authActions, ...tabActions }, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);