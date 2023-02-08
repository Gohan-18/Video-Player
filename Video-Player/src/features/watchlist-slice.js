import { createSlice } from "@reduxjs/toolkit";

const watchlistSLice = createSlice({
    name: 'watchlistSl',
    initialState: {
        watchlist: [],
        watcher: false
    },
    reducers: {
        addWatchlist(state, action) {
            const { videoInfo } = action.payload;
            // console.log(videos);
            // state.watchlist.push(videoInfo);
            // state.watchlist = [videoInfo];
            // state.watchlist = state.watchlist ? [...state.watchlist, {id.videoId} ] : [id.videoId];
            const existingItem = state.watchlist?.find(({ id}) => id.videoId === videoInfo.id.videoId);
            if(existingItem) {
                return;
            }
            else{
                state.watchlist.push(videoInfo);
                // state.watchlist = [...state.watchlist, videoInfo]
            }
            state.watcher = !state.watcher;
        },
        addWatchlistFromFirestore(state, action) {
            const  videos  = action.payload;
            console.log(action.payload);
            state.watchlist = [...state.watchlist, ...videos] ;

            // if(videos){
            //     for(let video of videos) {
            //         // console.log(video);
            //         const existingItem = state.watchlist?.find(({id}) => id.videoId === video.id.videoId);
            //         if(existingItem) {
            //             return;
            //         }
            //         else{
            //             state.watchlist.push(video);
            //         }

            //     }
            //     // const existingItem = state.watchlist?.find(({id}) => id.videoId === videos.id.videoId);
            //     // if(existingItem) {
            //     //     return;
            //     // }
            //     // else{
            //     //     state.watchlist = [...state.watchlist, ...videos] ;
            //     //     // state.watchlist.push(...videos);
            //     // }
            // }
        }
    }
})

export const { addWatchlist, addWatchlistFromFirestore } = watchlistSLice.actions;
export default watchlistSLice.reducer;