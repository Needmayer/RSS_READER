import React, {PropTypes} from 'react';
import ReactHtmlParser from 'react-html-parser';
import he from 'he';

class CollapseItem extends React.Component{
    
    constructor(props){
        super(props);        
        this.state = {
            isActive: false,
            glyphicon: "glyphicon glyphicon-collapse-down",
            descriptionClass: 'description collapsDescription'            
        };
        this.toggleText = this.toggleText.bind(this);
    }

    toggleText() {
        let icon = this.state.glyphicon == "glyphicon glyphicon-collapse-down" ? "glyphicon glyphicon-collapse-up" : "glyphicon glyphicon-collapse-down";
        let descriptionClass = this.state.descriptionClass === 'description collapsDescription' ? 'description showDescription' : 'description collapsDescription';
        this.setState({
            isActive: !this.state.isActive,
            glyphicon: icon,
            descriptionClass: descriptionClass            
        });
    }

  
    render(){
        return(
            <div className="collapseItem"
                onClick={this.toggleText} >
                <div className={this.state.descriptionClass}>{ReactHtmlParser(he.decode(this.props.descriptionText))}</div>
                <span className={this.state.glyphicon}></span>
            </div>
        );
    }

}


CollapseItem.propTypes = {
    descriptionText: PropTypes.string.isRequired
};

export default CollapseItem;