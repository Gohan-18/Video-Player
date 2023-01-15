import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/fetchFromAPI-slice';
import singleVideoReducer from './features/fetchSingleVideo-slice';

const store = configureStore({
    reducer: {
        homeVideos: homeReducer,
        videoDetail: singleVideoReducer
    }
})

export default store;