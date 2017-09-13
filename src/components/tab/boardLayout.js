import React, {PropTypes} from 'react';
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
            data: 'loading...',
            loginUser: Object.assign({}, props.loginUser)
        };
        this.getData = this.getData.bind(this);
    }    

    componentDidMount() {
        if(this.state.loginUser.username){
            this.getData(this.state.loginUser);        
        }else{
            this.getData(this.props.loginUser);
        }
        
    }

    componentWillReceiveProps(nextProps){        
        if(this.props.loginUser != nextProps.loginUser){                       
            this.getData(nextProps.loginUser);            
        }
    }

    getData(loginUser) {        
        
        getAllData(loginUser.username, data => {            
            this.setState({ 
                data: data,
                loginUser : loginUser 
            });
        });
    }


    render() {

        const masonryStyle = {
            display: 'flex'
        };
        if (this.state.data && this.state.data !== 'loading...') {
            return (
                <div className="container_layout">
                    <div>
                        <Masonry
                            style={masonryStyle}
                        >
                            {this.state.data.map(item =>                            
                                <ItemLayout
                                    key={item.rss.channel[0].title}
                                    data={item.rss}
                                />
                            )}
                        </Masonry>
                    </div>
                </div>
            );
        }
        return (<div>{this.state.data}</div>);
    }

}

BoardLayout.propTypes = {
    loginUser: PropTypes.object    
};

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        items: state.items
    };
}

export default connect(mapStateToProps)(BoardLayout);