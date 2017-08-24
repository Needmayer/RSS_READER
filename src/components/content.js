import React, { PropTypes } from 'react';
import BoardLayout from './tab/boardLayout.js';
import Menu from './menu/sidebar.js';

class Content extends React.Component{


    render(){
        return (
            <div>
                <Menu />
                <BoardLayout />
                
            </div>
        );
    }


}

export default Content;