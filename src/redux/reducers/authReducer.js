
export default function authReducer(state = [], action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, action.user);
        case 'UPDATE_USER':
            return Object.assign({}, state, action.user);
        case 'UPDATE_USER_CATEGORY_TITLE':
            return {
                username: Object.assign({}, state).username,
                categories: updateCategoryTitle(state, action)
            };
        case 'UPDATE_USER_CATEGORY_URL':            
            return{
                username : Object.assign({}, state).username,
                categories: updateCategoryUrl(state, action)
            };    
        default:
            return state;
    }


}

function updateCategoryUrl(state, action){
    const lastIndex = state.categories.length;    
    let categories = [...state.categories.map((item, index) => {                
        if(item.categoryTitle !== action.user.categoryTitle){
            return item;
        }        
        return {
            ...item,
            categoryUrls: updateUrls(item.categoryUrls, action)
        };
    })];    
    return categories;
}


function updateUrls(urls, action){
    let newUrls = [...urls.map((url, index) =>{
        if(index != action.user.id){
            return url;
        }
        return action.user.categoryUrl;           
    })];

    const lastIndex = urls.length;
    if(action.user.id == (lastIndex -1)){
        newUrls.push("");
    }
    return newUrls;
}

function updateCategoryTitle(state, action){
    const lastIndex = state.categories.length - 1;    
    let categories = [...state.categories.map((item, index) => {                
        if (index != action.user.id) {
            return item;
        }
        return {
            ...item,
            categoryTitle: action.user.categoryTitle
        };
    })];
    categories = categories.filter((item, index) =>{
        if(item.categoryTitle || index == lastIndex){
            return item;
        }
    });

    if(action.user.id == lastIndex){
        categories.push({
            categoryTitle: '',
            categoryUrls: [""]
        });
    }
    return categories;
}
