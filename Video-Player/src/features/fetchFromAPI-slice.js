import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE_URL ='https://youtube-v31.p.rapidapi.com';
const YOUTUBE_BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// const API_KEY = 'AIzaSyBrSEfcsGNf0o1MEogaUspiN-Jy0jTHqSE';

// Const GOOGLE_YOUTUBE_API_KEY = 'AIzaSyBrSEfcsGNf0o1MEogaUspiN-Jy0jTHqSE';

// const options = {
// 	headers: {
// 		'X-RapidAPI-Key': 'd460d4d2c0mshd8b49013829f012p100650jsn82ae708c273d',
// 		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
// 	}
// };

export const fetchHomeVideos = createAsyncThunk('fetch/homeVideos', async () => {
    try {
        const data = await fetch(`${YOUTUBE_BASE_URL}/search?maxResults=48&q='new videos'&key=${API_KEY}&part=snippet&type=video`)
        const result = await data.json();
        console.log(result)
        return result.items;
    } catch (error) {
        alert(error)
    }

});

export const fetchSearchedVideos = createAsyncThunk('fetch/searchedVideos', async ({keyword}) => {
    try {
        const data = await fetch(`${YOUTUBE_BASE_URL}/search?maxResults=49&q=${keyword}&key=${API_KEY}&part=snippet`)
        const result = await data.json();
        console.log(result)
        return result.items;
    } catch (error) {
        alert(error)
    }

});

// export const fetchSearchedChannel = createAsyncThunk('fetch/searchedVideos', async ({channelId}) => {
//     try {
//         const data = await fetch(`${YOUTUBE_BASE_URL}/channels?id=${channelId}&key=${API_KEY}&part=snippet`)
//         const result = await data.json();
//         console.log(result)
//         // return result.items;
//     } catch (error) {
//         alert(error)
//     }
//     // channels?part=contentDetails&
// });

// export const fetchHomeVideos = createAsyncThunk('fetch/homeVideos', async (url) => {
//     try {
//         const data = await fetch(`${BASE_URL}/${url}`, options)
//         const result = await data.json();
//         return result.items;
//     } catch (error) {
//         alert(error)
//     }

// });

    // const data = await fetch(`${BASE_URL}/${url}`, options)
    // const result = await data.json();
    // return result.items;

// export const fetchVideoDetails = createAsyncThunk('fetch/videoDetail', async (url) => {

//         const data = await fetch(`${BASE_URL}/${url}`, options);
//         const result = await data.json();
//         console.log(result);
//         return result;
// })

// fetch('https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=7ghhRHRP6t4', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


const videoSlice = createSlice({
    name: 'homeVideos',
    initialState: {
        homeVideos: [],
        searchedVideos: [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchHomeVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchHomeVideos.fulfilled, (state, action) => {
            state.homeVideos = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchSearchedVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSearchedVideos.fulfilled, (state, action) => {
            state.searchedVideos = action.payload;
            state.loading = false;
        })
    }
})

export default videoSlice.reducer;