import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CollapseItem from './CollapseItem';

export default class ItemRow extends React.Component {
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
            descriptionText: description,
            img: img
        });

    }

    getImgData(data) {
        let img = data.match(/<img/);
        return {
            src: img ? data.match(/src=\"[\w\/\.\d-:]*\"{1}/)[0].substring(5).slice(0, -1) : "",
            alt: img ? data.match(/alt="[\w\d\/\.-:]*"{1}/)[0].substring(5).slice(0, -1) : "",
            width: "50px",
            height: "50px"
        };
    }

    wrapDescription(description){
        if(description.substring(0,1) !== "<"){
            return "<div>" + description + "</div>";
        }
        return description;
    }


    render() {
        return (
            <div className="row_item">
                <div>
                    <div className="row_header">
                        {this.state.img.src && (
                            <img src={this.state.img.src} width="50px" height="50px" />
                        )}
                        <a href={this.props.item.link} target="_blank">{this.props.item.title}</a>
                    </div>

                    <div>
                        <CollapseItem descriptionText={this.state.descriptionText} />
                    </div>
                </div>
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
