import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../redux/actions/authActions.js';

class CategoryInput extends React.Component {

    constructor(props) {
        super(props);
        this.changeRssFeed = this.changeRssFeed.bind(this);
    }


    changeRssFeed(event) {
        const title = this.props.categoryTitle;
        let id = event.target.name;
        let url = event.target.value;
        let time = new Date().getTime();

        let newState = {
            id,
            categoryTitle: title,
            categoryUrl: url
        };
        console.log("update url");
        this.props.action.updateUserCategoryUrl(newState);

        if (!url) {
            this.props.action.deleteUrlError({id, index: this.props.index });
        }
    }


    render() {
        let category = getCategoryByIndex(this.props.loginUser.categories, this.props.index);
        let urls = category.categoryUrls;
        const allErrors = this.props.loginUser.errors || [];
        const errors = allErrors.filter(item => item.index == this.props.index);
        return (
            <div className="category_feeds">
                {
                    urls.map((item, index) => {
                        const error = errors.find(item => item.id == index);
                        if (error) {
                            return (<input
                                key={index}
                                type="text"
                                style={{
                                    border: 'solid 1px red'
                                }}
                                title={error.error}
                                name={index}
                                data-url={index}
                                placeholder="rss feed url"
                                onChange={this.changeRssFeed}
                                value={item} />);
                        }
                        return (
                            <input
                                key={index}
                                type="text"
                                name={index}
                                data-url={index}
                                placeholder="rss feed url"
                                onChange={this.changeRssFeed}
                                value={item} />
                        );
                    })
                }
            </div>
        );
    }

}

CategoryInput.propTypes = {
    loginUser: PropTypes.object.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

function getCategoryByIndex(categories, index) {
    return categories[index];
}

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


export default connect(mapStateToProps, mapDispatchToProps)(CategoryInput);
