import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/actions/authActions.js';
import * as tabActions from '../../redux/actions/tabActions.js';
import toastr from 'toastr';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.filterCategory = this.filterCategory.bind(this);
        this.signOut = this.signOut.bind(this);

        this.state = {};


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
        this.redirectToHomePage();
        let filter = event.target.name;
        let user = Object.assign({}, this.props.loginUser);
        user.filter = filter;
        this.props.actions.updateCategoryFilter(user);
        this.setState({ activeItem: filter, style: { backgroundColor: "#EDEDED" } });
    }

    async signOut() {
        fetch('api/logout', {
            credentials: "include"
        }).then(resp => {
            return resp.json();
        }).then(response => {
            if (!response.error) {
                toastr.success('You where succesfully logout.');
                setTimeout(() => {
                    this.props.actions.logout({ username: "#", categories: [""] });
                    this.props.actions.deleteAllItems();
                    return this.redirectToHomePage();
                }, 1000);

            } else {
                toastr.error("error occured.");
                return;
            }
        }).catch(error => {
            return Promise.reject(Error(error.message));
        });

    }

    render() {
        const user = this.props.loginUser;
        return (
            <nav className="nav-sidebar pull-right">
                <ul className="nav">
                    <li className="active"><Link to="/" onClick={this.redirectToHomePage}>Home</Link></li>
                    {(user.username && user.username !== '#') && (
                        <div>
                            <li><Link to="/rssDialog">Manage RSS</Link></li>
                            <a href="#" onClick={this.filterCategory}>Categories</a>
                            <div className="menu-categories">
                                {user.categories.map((item, index) => {
                                    if (item.categoryTitle) {
                                        return <a href="#"
                                            style={this.state.activeItem === item.categoryTitle ? this.state.style : undefined}
                                            key={index} className="nav-li"
                                            onClick={this.filterCategory}
                                            name={item.categoryTitle}>{item.categoryTitle}</a>;
                                    }
                                })
                                }
                            </div>
                            <li><Link to="/" onClick={this.signOut}><i className="glyphicon glyphicon-off"></i> Logout</Link></li>
                        </div>
                    )}
                    {(!user.username || user.username === '#') && (
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