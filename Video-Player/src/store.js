import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/fetchFromAPI-slice';
import singleVideoReducer from './features/fetchSingleVideo-slice';
import watchlistReducer from './features/watchlist-slice';

const store = configureStore({
    reducer: {
        homeVideos: homeReducer,
        videoDetail: singleVideoReducer,
        watchlistSl : watchlistReducer
    }
})

export default store;