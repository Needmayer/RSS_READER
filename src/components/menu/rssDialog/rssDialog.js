import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Menu from '../sidebar.js';
import CategoryInput from '../../common/CategoryInput.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../redux/actions/authActions.js';
import toastr from 'toastr';


class RssDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCategoryTitle = this.changeCategoryTitle.bind(this);
        this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this);
    }

    componentWillMount() {
        this.checkIfUserIsLoggedIn();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    checkIfUserIsLoggedIn() {

        if (!this.props.loginUser.username || this.props.loginUser.username === '#') {
            this.setState({
                loggedUser: false
            });
            this.timeoutHandle = setTimeout(() => {
                browserHistory.push("/");
            }, 5000);
        }
        this.setState({
            loggedUser: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const userData = this.props.loginUser;

        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(resp => {
            return resp.json();
        }).then(body => {
            if(body.error){
                toastr.error(body.error);                
                return;
            }
            toastr.success('Rss feeds saved');
        });

    }

    changeCategoryTitle(event) {
        let id = event.target.name;
        let newTitle = event.target.value;
        let newCategoryTitle = {
            categoryTitle: newTitle,
            id: id
        };
        this.props.action.updateUserCategoryTitle(newCategoryTitle);
    }

    render() {
        if (!this.state.loggedUser || !this.props.loginUser.username || this.props.loginUser.username === '#') {
            return (
                <div className="errorPage">You must be logged in to manage your RSS feeds</div>
            );
        }

        const categories = [...this.props.loginUser.categories];

        return (
            <div>
                <Menu />
                <div className="modal-dialog">
                    <div className="loginmodal-container">
                        <h1>Manage your Rss</h1><br />
                        <form onSubmit={this.handleSubmit}>
                            {
                                categories.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                placeholder="Category title"
                                                name={index} onChange={this.changeCategoryTitle}
                                                value={item.categoryTitle} />
                                            <CategoryInput categoryTitle={item.categoryTitle} />
                                        </div>
                                    );
                                })
                            }
                            <input type="submit" value="Save" className="login loginmodal-submit" />

                        </form>
                        <div className="login-help">
                            <Link to="/" onClick={this.redirectToHomePage}>Back to Home page</Link>
                        </div>

                    </div>
                </div>
            </div>
        );

    }

}

RssDialog.propTypes = {
    loginUser: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser

    };
}

function mapDispatchToProps(dispach) {
    return {
        action: bindActionCreators(authActions, dispach)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RssDialog);