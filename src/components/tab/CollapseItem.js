import React, {PropTypes} from 'react';
import ReactHtmlParser from 'react-html-parser';
import he from 'he';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as tabActions from '../../redux/actions/tabActions.js';
import * as uniqueId from '../common/uniqueID.js';


class CollapseItem extends React.Component{
    
    constructor(props){
        super(props);           
        this.state = {
            id: props.id,
            isActive: false,
            glyphicon: "glyphicon glyphicon-collapse-down",
            descriptionClass: 'description collapsDescription',
            descriptionText: props.descriptionText      
        };
        this.toggleText = this.toggleText.bind(this);        
    }

    componentDidMount(){
        this.props.actions.createItem(this.state);
    }

    toggleText() {
        const item = this.props.item;
        let icon = item.glyphicon == "glyphicon glyphicon-collapse-down" ? "glyphicon glyphicon-collapse-up" : "glyphicon glyphicon-collapse-down";
        let descriptionClass = item.descriptionClass === 'description collapsDescription' ? 'description showDescription' : 'description collapsDescription';
        
        let newState = {
            id: item.id,
            descriptionText : item.descriptionText,
            isActive: !item.isActive,
            glyphicon: icon,
            descriptionClass: descriptionClass 
        };
        this.props.actions.updateItem(newState);
    }

  
    render(){
        const item = this.props.item ? this.props.item : this.state;
        return(
            <div className="collapseItem"
                onClick={this.toggleText} >
                <div className={item.descriptionClass}>{ReactHtmlParser(he.decode(item.descriptionText))}</div>
                <span className={item.glyphicon}></span>
            </div>
        );
    }

}


CollapseItem.propTypes = {
    actions: PropTypes.object.isRequired,
    item: PropTypes.object,
    id: PropTypes.number.isRequired,
    descriptionText: PropTypes.string.isRequired
    
};

function getItemById(items, id){
    let item = items.filter(item => item.id == id);
    if(item) return item[0];
    return null;
}

function mapStateToProps(state, ownProps){    
    const itemId = ownProps.id;

    let item = {id : '', descriptionText: '', isActive:'', glyphicon:'', descriptionClass:''};

    if(itemId && state.items.length > 0){
        item = getItemById(state.items, itemId);
    }    
    return{
        item: item
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(tabActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CollapseItem);
