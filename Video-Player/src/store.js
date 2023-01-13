import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/fetchFromAPI-slice';

const store = configureStore({
    reducer: {
        home: homeReducer
    }
})

export default store;