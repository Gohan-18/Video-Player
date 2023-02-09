import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Auth";

export const fetchAddWatchlist = createAsyncThunk('fetch/watchlistFirestore', async ({user}) => {
    console.log(user?.uid)
    const watchlistRef = doc(db, 'watchlist', user?.uid);
    const docSnap = await getDoc(watchlistRef);
    const videos = docSnap.data().videos;
    console.log(videos)
    return videos;
})

const watchlistSLice = createSlice({
    name: 'watchlistSl',
    initialState: {
        watchlist: [],
        watcher: false,
        loading: false
    },
    reducers: {
        addWatchlist(state, action) {
            // const { videoInfo } = action.payload;
            // // console.log(videos);
            // // state.watchlist.push(videoInfo);
            // // state.watchlist = [videoInfo];
            // // state.watchlist = state.watchlist ? [...state.watchlist, {id.videoId} ] : [id.videoId];
            // const existingItem = state.watchlist?.find(({ id}) => id.videoId === videoInfo.id.videoId);
            // if(existingItem) {
            //     return;
            // }
            // else{
            //     state.watchlist.push(videoInfo);
            //     // state.watchlist = [...state.watchlist, videoInfo]
            // }
            // state.watcher = !state.watcher;
        },
        addWatchlistFromFirestore(state, action) {
            // const  videos  = action.payload;
            // console.log(action.payload);
            // state.watchlist = [...state.watchlist, ...videos] ;

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
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAddWatchlist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAddWatchlist.fulfilled, (state, action) => {
            state.watchlist = action.payload;
            state.loading = false;
        })
        // builder.addCase(fetchVideoSuggestion.pending, (state) => {
        //     state.loading = true;
        // })
        // builder.addCase(fetchVideoSuggestion.fulfilled, (state, action) => {
        //     state.videoSuggestion = action.payload;
        //     state.loading = false;
        // })
    }
})

export const { addWatchlist, addWatchlistFromFirestore } = watchlistSLice.actions;
export default watchlistSLice.reducer;