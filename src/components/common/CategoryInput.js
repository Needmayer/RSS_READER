import React from 'react';
import { Link, browserHistory } from 'react-router';



class CategoryInput extends React.Component {

    constructor() {
        super();
        this.state = {
            feeds: [""]
        };

        this.changeRssFeed = this.changeRssFeed.bind(this);
    }
   
    changeRssFeed(event) {
        let id = event.target.name;
        let url = event.target.value;
        let feeds = this.state.feeds;
        feeds[id] = url;
        
        if (id == (feeds.length - 1)) {
            feeds.push("");            
        }
        
        this.setState({
            feeds: feeds
        });
    }


    render() {
        let feeds = this.state.feeds;
        return (
            <div className="category_feeds">
                {
                    feeds.map((item,index) => {
                        return <input key={index} type="text" name={index} placeholder="rss feed url" onChange={this.changeRssFeed} />;
                    })
                }
            </div>
        );
    }

}



export default CategoryInput;