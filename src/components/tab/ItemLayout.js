import React from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList.js';

const ItemLayout = ({data}) => {
    const items = data.channel[0].item;
    const pageTitle = data.channel[0].title;
    const pageLink = data.channel[0].link;
    return (
        
        <div className="itemLayout">
            <h2><a href={pageLink} target="_blank">{pageTitle}</a></h2>
            <ItemList 
            items={items}/>
        </div>
    );       
    
};

ItemLayout.propTypes = {
    data: PropTypes.object.isRequired
};

export default ItemLayout;
