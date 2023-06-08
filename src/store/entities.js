import { combineReducers } from "redux";
import cartSlice from "./cartSlice";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
    cart: cartSlice
});

export default persistReducer(persistConfig, reducer);