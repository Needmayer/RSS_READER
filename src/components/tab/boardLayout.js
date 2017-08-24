import React, { PropTypes } from 'react';
import ItemLayout from './ItemLayout.js';
import { getMockData } from './../../Api/mockData.js';
import { getAllData } from './../../Api/api.js';
import Masonry from 'react-masonry-component';

class BoardLayout extends React.Component {

    constructor() {
        super();
        this.state = {
            data: 'loading...'
        };
    }

    componentDidMount() {
        console.log(this.refs);
        getAllData(data => this.setState({ data: data }));
    }


    render() {
        const mockData = getMockData();
        const width = document.body.clientWidth;
        const masonryStyle = {
            display:'flex'
        };
        const mansoryOption = {
            enableResizableChildren: true
        }
        if (this.state.data && this.state.data !== 'loading...') {
            return (
                <div className="container_layout">
                    <div>
                        <Masonry
                         style={masonryStyle}
                         options ={mansoryOption}
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

export default BoardLayout;