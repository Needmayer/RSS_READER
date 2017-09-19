export function login(user){
    return{
        type: 'LOGIN', 
        user
    };
}
export function logout(user){
    return{
        type: 'LOGOUT', 
        user
    };
}
export function updateUser(user){
    return{
        type: 'UPDATE_USER', 
        user
    };
}

export function updateUserCategoryTitle(user){
    return{
        type: 'UPDATE_USER_CATEGORY_TITLE', 
        user
    };
}

export function updateUserCategoryUrl(user){
    return{
        type: 'UPDATE_USER_CATEGORY_URL', 
        user
    };
}

export function updateCategoryFilter(user){
    return{
        type: 'UPDATE_USER_CATEGORY_FILTER', 
        user
    };
}