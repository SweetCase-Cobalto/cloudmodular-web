const UPDATE = "ACCOUNTLIST/UPDATE"

const initialState = {
    accounts: null,
};

export const updateAccountList = (accountResults) => {
    const accounts = [];
    accountResults.forEach((user) => {
        if(!user.is_admin) {
            accounts.push({
                name: user.name,
                storageSize: user.storage_size,
                id: user.id,
                email: user.email,
            });
        }
    });

    return {
        type: UPDATE,
        accounts: accounts,
    }
}

export const accountList = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE:
            return {
                ...state,
                accounts: action.accounts,
            }
        default:
            return state;
    }
}