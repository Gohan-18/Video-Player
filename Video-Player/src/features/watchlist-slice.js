import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Auth";

export const fetchAddWatchlist = createAsyncThunk('fetch/watchlistFirestore', async ({user}) => {
    // console.log(user?.uid)
    const watchlistRef = doc(db, 'watchlist', user?.uid);
    const docSnap = await getDoc(watchlistRef);
    const videos = docSnap.data().videos;
    // console.log(videos)
    return videos;
})

// export const addDataFirestoreFirstTime = createAsyncThunk('fetch/firestoreCreate', async ({res}) => {
//     console.log(res.user.uid)
//     try {
//         const collectionRef = collection(db, "watchlist");
//         await addDoc(collectionRef, {
//           videos: []
//         });
//         // console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     // try {
//     //     const watchlistRef = doc(db, 'watchlist', res.user.uid);
//     //     const docRef = await setDoc(watchlistRef, {
//     //       videos: []
//     //     });
//     //   } catch (e) {
//     //     console.error("Error adding document: ", e);
//     // }
// })

const watchlistSLice = createSlice({
    name: 'watchlistSl',
    initialState: {
        watchlist: [],
        watcher: false,
        loading: false,
        alert: {
            open: false,
            message: "Added to the watchlist!!!",
            type: "success",
        }
    },
    reducers: {
        removeFromWatchlist(state, action) {
            const { id } = action.payload;
            // console.log(id)
            state.watchlist = state.watchlist.filter(({ id : fireId }) => (fireId.videoId !== id.videoId));
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
        removeAlert(state) {
            state.alert.open = false
        },
        loginMessage(state, action) {
            state.alert = action.payload;
        },
        clearWatchlist(state) {
            state.watchlist = [];
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAddWatchlist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAddWatchlist.fulfilled, (state, action) => {
            state.watchlist = action.payload.reverse();
            state.loading = false;
        })
    }
})

export const { addWatchlist, removeFromWatchlist, removeAlert, loginMessage, clearWatchlist } = watchlistSLice.actions;
export default watchlistSLice.reducer;