import React, {PropTypes} from 'react';
import ItemRow from './ItemRow';

class ItemList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            size: 5,
            disabled: false
        };
        this.showMore = this.showMore.bind(this);
    }

    componentDidUpdate(){
        window.addEventListener('resize', function () {
        });
        window.resizeTo(window.outerWidth +1, window.outerHeight-1);    
    }

    showMore(){
        let size = this.state.size;
        let maxSize = this.props.items.length;
        this.setState({
            size: ((size+3) < maxSize) ? (size + 3) : maxSize,
            disabled: (size >= maxSize)
        });        
    }

    render(){
        let items = this.props.items.slice(0,this.state.size);
        return(
            <div className ="list">
                {items.map(item =>
                    <ItemRow 
                    key={item.title}
                    item={item} />
                )}
                <div 
                    className="collapseList" 
                    onClick={this.showMore}>
                    <button className="btn btn-default showMoreBtn" disabled={this.state.disabled}>Zobrazit více</button>
                </div>
            </div>
        );
    }
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired
};

export default ItemList;