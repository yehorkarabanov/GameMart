import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import storage from 'redux-persist/lib/storage';
import {persistCombineReducers} from 'redux-persist';
import productSlice from "./slices/productSlice";
import likeSlice from "./slices/likeSlice";
import cartSlice from "./slices/cartSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['product']
};

export const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        user: userSlice,
        product: productSlice,
        like: likeSlice,
        cart: cartSlice,
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})