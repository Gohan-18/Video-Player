import { createSlice } from "@reduxjs/toolkit";

const watchlistSLice = createSlice({
    name: 'watchlistSl',
    initialState: {
        watchlist: []
    },
    reducers: {
        addWatchlist(state, action) {
            const { id } = action.payload;
            console.log(id);
            state.watchlist = state.watchlist ? [...state.watchlist, id.videoId ] : [id.videoId];
        }
    }
})

export const { addWatchlist } = watchlistSLice.actions;
export default watchlistSLice.reducer;