import {configureStore} from '@reduxjs/toolkit';
import useSlice from './features/useSlice';
import appApi from './services/appApi';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


const reducer = combineReducers ({
    user: useSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore ({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;