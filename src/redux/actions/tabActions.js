
/* reakce na toogle collapse item */
export function updateItem(item){    
    return{
        type: 'UPDATE_ITEM', 
        item
    };
}

export function createItem(item){
    return{
        type: 'CREATE_ITEM',
        item
    };
}

export function deleteAllItems(){
    return{
        type: 'DELETE_ALL_ITEMS',
        item: []
    }
}