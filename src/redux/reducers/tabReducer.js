
export default function tabReducer(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ITEM':
        return state.map(item =>
            (item.id === action.item.id) 
              ? Object.assign({}, action.item)
              : item
          );
        case 'CREATE_ITEM':
            return [
                ...state,
                Object.assign({}, action.item)
            ];
        default:
            return state;
    }


}