import { combineReducers } from "redux";
import { myAccount } from "./myAccount";
import { storageResult } from "./storageResult";
import { accountList } from "./accountList";


const rootReducer = combineReducers({
    myAccount, storageResult, accountList
});
export default rootReducer;