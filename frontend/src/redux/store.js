import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducers = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})