import React from 'react';
import PropTypes from 'prop-types';
import ItemLayout from './ItemLayout.js';
import { getMockData } from './../../Api/mockData.js';
import { getAllData } from './../../Api/api.js';
import Masonry from 'react-masonry-component';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BoardLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            loginUser: Object.assign({}, props.loginUser)
        };
        this.getData = this.getData.bind(this);
        this.getData(this.state.loginUser);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loginUser != nextProps.loginUser) {
            this.getData(nextProps.loginUser);
        }
    }

    async getData(loginUser) {
        let data = await getAllData(loginUser);
        this.setState({
            data: data
        });
        return;
    }


    render() {
        const masonryStyle = {
            display: 'flex'
        };
        let itemsNotEmpty = Boolean(this.state.data);
        const loggedUser = Boolean(this.props.loginUser && this.props.loginUser.username && this.props.loginUser.username != '#');
        if (itemsNotEmpty && loggedUser) {
            return (
                <div className="container_layout">
                    <div>
                        <Masonry
                            style={masonryStyle}
                        >
                            {this.state.data.map((item, index) =>
                                <ItemLayout
                                    key={item.rss.channel[0].title + index}
                                    data={item.rss}
                                />

                            )}
                        </Masonry>
                    </div>
                </div>
            );
        }
        return (<div></div>);
    }

}

BoardLayout.propTypes = {
    loginUser: PropTypes.object,
    items: PropTypes.array
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        items: state.items
    };
}

export default connect(mapStateToProps)(BoardLayout);