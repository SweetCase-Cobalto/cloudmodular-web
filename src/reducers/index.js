import { combineReducers } from "redux";
import { myAccount } from "./myAccount";
import { storageResult } from "./storageResult";


const rootReducer = combineReducers({
    myAccount, storageResult
});
export default rootReducer;