import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import Menu from '../sidebar.js';
import CategoryInput from './CategoryInput.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../redux/actions/authActions.js';
import toastr from 'toastr';


class RssDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCategoryTitle = this.changeCategoryTitle.bind(this);
        this.checkTitlesDuplicity = this.checkTitlesDuplicity.bind(this);
        this.findDuplicity = this.findDuplicity.bind(this);
        this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this);
        this.testFeed = this.testFeed.bind(this);
        this.testFeeds = this.testFeeds.bind(this);
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

    checkTitlesDuplicity() {
        const categories = this.props.loginUser.categories;
        for (const category of categories) {
            let duplicity = this.findDuplicity(categories, category.categoryTitle);
            if (duplicity > 1) {
                return category.categoryTitle;
            }
        }
        return false;
    }

    findDuplicity(categories, title) {
        return categories.filter(item => item.categoryTitle == title).length;
    }

    async testFeed(url, id) {
        let response = await (
            await fetch('/api/testUrl', {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "include"
            })
        ).json();
        return response;
    }

    async testFeeds() {
        const categories = this.props.loginUser.categories;
        for (const [index, category] of categories.entries()) {            
            for (const [id, url] of category.categoryUrls.entries()) {
                if(url){
                    const error = await this.testFeed(url, id);                      
                    if(error.errorMsg){
                        this.props.action.updateUrlError({ error: error.errorMsg, id, index });
                    }else{
                        console.log("id", id);
                        console.log("index", index);
                        this.props.action.deleteUrlError({id, index });
                    }
                }
                
            }
        }
        return true;
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.testFeeds();
        const userData = this.props.loginUser;
        if (userData.errors && userData.errors.length) {
            return this.setState({ error: "There is incorrect url", title: '' });
        }
        let duplicity = this.checkTitlesDuplicity();
        if (duplicity) {
            return this.setState({ error: "Category is duplicit", title: duplicity });
        }

        fetch('/api/updateUsersCategories', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "include"
        }).then(resp => {
            return resp.json();
        }).then(body => {
            if (body.error) {
                this.setState({
                    error: body.error,
                    title: ''
                });
                return;
            }
            toastr.success('Rss feeds saved');
            return this.setState({ error: '', title: '' });

        });

    }

    changeCategoryTitle(event) {
        let id = event.target.name;
        let newTitle = event.target.value;
        let newCategoryTitle = {
            categoryTitle: newTitle,
            id: id,
            error: this.props.loginUser.error
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

                                            {(this.state.error && this.state.title && this.state.title == item.categoryTitle) && (
                                                <div className="red">{this.state.error}</div>
                                            )}
                                            <CategoryInput categoryTitle={item.categoryTitle} index={index} />
                                        </div>
                                    );
                                })
                            }
                            {this.state.error && !this.state.title && (
                                <div className="red">{this.state.error}</div>
                            )}
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