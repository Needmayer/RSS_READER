import React, {PropTypes} from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/actions/authActions.js';

class CategoryInput extends React.Component {

    constructor(props) {
        super(props);     

        this.changeRssFeed = this.changeRssFeed.bind(this);
    }

    changeRssFeed(event) {
        const title = this.props.categoryTitle;
        let id = event.target.name;
        let url = event.target.value;
        
        let newState = {
            id,
            categoryTitle: title,
            categoryUrl: url
        };
      
        this.props.action.updateUserCategoryUrl(newState);
    }


    render() {
        let category = findCategoryByTitle(this.props.loginUser.categories, this.props.categoryTitle);
        let urls = category.categoryUrls;
        return (
            <div className="category_feeds">
                {
                    urls.map((item,index) => {
                        return <input 
                        key={index} 
                        type="text" 
                        name={index} 
                        placeholder="rss feed url" 
                        onChange={this.changeRssFeed} 
                        value={item}/>;
                    })
                }
            </div>
        );
    }

}

CategoryInput.propTypes = {
    loginUser: PropTypes.object.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired
};

function findCategoryByTitle(categories, title){
    return categories.find(category => category.categoryTitle === title);
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
