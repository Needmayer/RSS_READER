import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import CollapseItem from './CollapseItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tabActions from '../../redux/actions/tabActions.js';
import * as uniqueId from '../common/uniqueID.js';

class ItemRow extends React.Component {

    constructor(props) {
        super(props);
        let description = this.props.item.description[0].replace("\\", "");
        this.state = {
            description: description,
            descriptionText: description,
            img: {
                src: '',
                alt: '',
                width: '50px',
                height: '50px'
            }
        };

    }

    componentWillMount() {
        let description = this.state.description;
        let img = this.getImgData(this.state.description);
        if (img.src !== "") {
            description = description.replace(/<img[\s\d\w\"\:\/\.=-]*>/, "");
        }
        description = this.wrapDescription(description);

        this.setState(
            {
                id: this.state.id ? this.state.id : uniqueId.getItemId(),
                descriptionText: description,
                img: img
            });

    }

    getImgData(data) {
        let img = data.match(/<img/);
        let src = null, alt = null;
        if (img) {
            src = data.match(/src=\"[\w:\/\-\.()]*/);
            alt = data.match(/alt=\"[\w]*/);
        }

        return {
            src: src ? src[0].substring(5) : "",
            alt: alt ? alt[0].substring(5) : "",
            width: "50px",
            height: "50px"
        };
    }

    wrapDescription(description) {
        if (description.substring(0, 1) !== "<") {
            return "<div>" + description + "</div>";
        }
        return description;
    }


    render() {
        return (
            <div className="row_item">
                <div className="row_header">
                    {this.state.img.src && (
                        <img src={this.state.img.src} width="50px" height="50px" />
                    )}
                    <a href={this.props.item.link} target="_blank">{this.props.item.title}</a>
                </div>
                <CollapseItem id={this.state.id} descriptionText={this.state.descriptionText} />
            </div>
        );
    }

}

ItemRow.propTypes = {
    item: PropTypes.shape({
        description: PropTypes.arrayOf(PropTypes.string).isRequired,
        link: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.arrayOf(PropTypes.string).isRequired
    })
};


function mapStateToProps(state, ownProps) {
    return {
        items: state.items
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tabActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);
//export default ItemRow;