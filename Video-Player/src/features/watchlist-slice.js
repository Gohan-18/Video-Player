import { createSlice } from "@reduxjs/toolkit";

const watchlistSLice = createSlice({
    name: 'watchlistSl',
    initialState: {
        watchlist: []
    },
    reducers: {
        addWatchlist(state, action) {
            const { videoInfo } = action.payload;
            console.log(videoInfo);
            // state.watchlist.push(videoInfo);
            // state.watchlist = [videoInfo];
            // state.watchlist = state.watchlist ? [...state.watchlist, {id.videoId} ] : [id.videoId];
            const existingItem = state.watchlist?.find(({ id}) => id.videoId === videoInfo.id.videoId);
            if(existingItem) {
                return;
            }
            else{
                state.watchlist.push(videoInfo);
            }
        }
    }
})

export const { addWatchlist } = watchlistSLice.actions;
export default watchlistSLice.reducer;