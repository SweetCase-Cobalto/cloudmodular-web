const UPDATE = "MYACCOUNT/UPDATE";


const initialState = {
    isAdmin: false,
    name: null,
    storageSize: -1,
    id: -1,
    email: null,
    usage: -1,
};

export const updateMyAccount = (userData) => {
    return {
        type: UPDATE,
        isAdmin: userData.is_admin,
        name: userData.name,
        storageSize: userData.storage_size,
        id: userData.id,
        email: userData.email,
        usage: userData.usage,
    }
};

export const myAccount = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE:
            return {
                ...state,
                isAdmin: action.isAdmin,
                name: action.name,
                storageSize: action.storageSize,
                id: action.id,
                email: action.email,
                usage: action.usage,
            }
        default:
            return state;
    }
};