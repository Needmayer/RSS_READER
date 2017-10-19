
export default function authReducer(state = [], action) {

    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, action.user);
        case 'LOGOUT':
            return Object.assign({}, state, action.user);
        case 'UPDATE_USER':
            return Object.assign({}, state, action.user);
        case 'UPDATE_USER_CATEGORY_TITLE':
            return {
                username: Object.assign({}, state).username,
                categories: updateCategoryTitle(state, action),
                errors: Object.assign({}, state).errors
            };
        case 'UPDATE_USER_CATEGORY_URL':
            return {
                username: Object.assign({}, state).username,
                categories: updateCategoryUrl(state, action),
                errors: Object.assign({}, state).errors
            };
        case 'UPDATE_USER_CATEGORY_FILTER':
            return Object.assign({}, state, action.user);
        case 'ADD_URL_ERROR':
            const errors = state.errors ? state.errors : [];
            return {
                username: Object.assign({}, state).username,
                categories: Object.assign({}, state).categories,
                errors: [action.user, ...errors]
            };
        case 'DELETE_URL_ERROR':
            return {
                username: Object.assign({}, state).username,
                categories: Object.assign({}, state).categories,
                errors: deleteError(state, action.user)
            };
        case 'UPDATE_URL_ERROR':
            return {
                username: Object.assign({}, state).username,
                categories: Object.assign({}, state).categories,
                errors: updateErrors(state, action.user)
            };
        default:
            return state;
    }
}

function deleteError(state, error) {
    if (!state.errors) {
        return [];
    }
    let newErros = state.errors.filter(item => ((item.index != error.index) || (item.id != error.id)));
    return newErros;
}

function updateErrors(state, error) {
    console.log("action update error", error);
    if (!state.errors) {
        return [error];
    }
    let isError = state.errors ? state.errors.find(item => (item.id == error.id && item.index == error.index)) : false;
    const length = state.categories[error.index].categoryUrls.length - 1;
    if (isError) {
        return state.errors.map((item) => {
            if (item.id == error.id && item.index == error.index) {
                return { ...error };
            }
            return item;
        });
    } else {

        let errors = cleanErrorsArray(state.errors, state.categories);
        return [error, ...errors];
    }
}

function cleanErrorsArray(errors, categories){
    let cleanErrors = [...errors];
    for(const [index, category] of categories.entries()){
        const length = category.categoryUrls.length - 1;
        
        cleanErrors = cleanErrors.filter(item => {
            if (item.index !== index) return item;
            else if (item.index == index && item.id < length) {
                return item;
            }
        });
    }
    return cleanErrors
}

function updateCategoryUrl(state, action) {
    let categories = [...state.categories.map((item, index) => {
        if (item.categoryTitle !== action.user.categoryTitle) {
            return item;
        }
        let categoryUrls = updateUrls(item.categoryUrls, action);
        return {
            ...item,
            categoryUrls
        };
    })];
    return categories;
}


function updateUrls(urls, action) {
    let newUrls = [...urls.map((url, index) => {
        if (index != action.user.id) {
            return url;
        }
        return action.user.categoryUrl;
    })];
    const lastIndex = newUrls.length - 1;
    let array = [];
    for (const [index, value] of newUrls.entries()) {
        if (value || index == lastIndex) {
            array.push(value);
        }
    }

    if (action.user.id == lastIndex) {
        array.push("");
    }
    return array;
}

function updateCategoryTitle(state, action) {
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
    categories = categories.filter((item, index) => {
        if (item.categoryTitle || index == lastIndex) {
            return item;
        }
    });

    if (action.user.id == lastIndex) {
        categories.push({
            categoryTitle: '',
            categoryUrls: [""]
        });
    }
    return categories;
}
