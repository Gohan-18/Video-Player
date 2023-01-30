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
        // console.log(result)
        return result;
    } catch (error) {
        alert(error)
    }

});
export const fetchMoreHomeVideos = createAsyncThunk('fetch/moreHomeVideos', async (nextPageToken) => {
    console.log(nextPageToken)
    try {
        const data = await fetch(`${YOUTUBE_BASE_URL}/search?maxResults=48&q='new videos'&key=${API_KEY}&part=snippet&type=video&pageToken=${nextPageToken}`)
        const result = await data.json();
        console.log(result)
        return result;
    } catch (error) {
        alert(error)
    }

});

// GET https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json


export const fetchSearchedVideos = createAsyncThunk('fetch/searchedVideos', async ({keyword}) => {
    try {
        const data = await fetch(`${YOUTUBE_BASE_URL}/search?maxResults=48&q=${keyword}&key=${API_KEY}&part=snippet&type=video,channel`)
        const result = await data.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    }

});

export const fetchMoreSearchedVideos = createAsyncThunk('fetch/moreSearchedVideos', async ({keyword,nextPageToken}) => {
    console.log(nextPageToken)
    try {
        const data = await fetch(`${YOUTUBE_BASE_URL}/search?maxResults=48&q=${keyword}&key=${API_KEY}&part=snippet&type=video,channel&pageToken=${nextPageToken}`)
        const result = await data.json();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    }

});

export const fetchSearchedChannel = createAsyncThunk('fetch/searchedChannel', async ({channelid}) => {
    // console.log(channelid);
    try {
        const data = await fetch(`${YOUTUBE_BASE_URL}/channels?part=snippet,contentDetails,statistics&id=${channelid}&key=${API_KEY}`)
        const result = await data.json();
        // console.log(result.items[0])
        const playlistId = result?.items[0]?.contentDetails?.relatedPlaylists?.uploads;
        console.log(result)
        console.log(playlistId)
        const channelPlaylistData = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?maxResults=48&part=snippet&playlistId=${playlistId}&key=${API_KEY}`)
        const finalChannelPlaylistData = await channelPlaylistData.json();

        // console.log(result);
        // console.log(finalChannelPlaylistData);
        const finalResult = {result, finalChannelPlaylistData};
        console.log(finalResult)
        return finalResult;
        // return result.items[0];
    } catch (error) {
        console.log(error)
    }
    // channels?part=contentDetails&
});

// export const fetchSearchedChannelPlaylist = createAsyncThunk('fetch/searchedChannelPlaylist', async (playlistId) => {
//     console.log(playlistId);
//     try {
//         const data = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?maxResults=48&part=snippet&playlistId=${playlistId}&key=${API_KEY}`)
//         const result = await data.json();
//         // console.log(result)
//         return result.items;
//     } catch (error) {
//         console.log(error)
//     }
//     // channels?part=contentDetails&
// });

// export const fetchSearchedChannelPlaylist = createAsyncThunk('fetch/searchedChannelPlaylist', async ({channelid}) => {
//     // console.log(playlistId);
//     try {
//         const data = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?maxResults=48&part=snippet&id=${channelid}&key=${API_KEY}`)
//         const result = await data.json();
//         // console.log(result)
//         return result.items;
//     } catch (error) {
//         console.log(error)
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
        nextPageToken : '',
        searchedVideos: [],
        searchedChannel: {},
        searchedChannelPlaylist: [],
        searchedChannelPlaylistLoader: false,
        playlistId: '',
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchHomeVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchHomeVideos.fulfilled, (state, action) => {
            state.homeVideos = action.payload.items;
            // console.log(state.homeVideos)
            state.nextPageToken = action.payload.nextPageToken;
            // console.log(state.nextPageToken);
            state.loading = false;
        })
        builder.addCase(fetchMoreHomeVideos.fulfilled, (state, action) => {
            state.homeVideos = [...state.homeVideos, ...action.payload.items];
            // console.log(state.homeVideos)
            state.nextPageToken = action.payload.nextPageToken;
            console.log(state.nextPageToken);
        })
        builder.addCase(fetchSearchedVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSearchedVideos.fulfilled, (state, action) => {
            state.searchedVideos = [];
            state.searchedVideos = [...state.searchedVideos, ...action.payload.items];
            state.nextPageToken = action.payload.nextPageToken;
            // console.log(state.nextPageToken);
            state.loading = false;
        })
        builder.addCase(fetchMoreSearchedVideos.fulfilled, (state, action) => {
            state.searchedVideos = [...state.searchedVideos, ...action.payload.items];
            state.nextPageToken = action.payload.nextPageToken;
            console.log(state.nextPageToken);
            // state.loading = false;
        })
        builder.addCase(fetchSearchedChannel.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSearchedChannel.fulfilled, (state, action) => {
            state.searchedChannel = action.payload?.result?.items[0];
            state.searchedChannelPlaylist = action.payload.finalChannelPlaylistData.items;
            // state.playlistId = action.payload.contentDetails.relatedPlaylists.uploads;
            state.loading = false;
        })
        // builder.addCase(fetchSearchedChannelPlaylist.pending, (state) => {
        //     state.searchedChannelPlaylistLoader = true;
        // })
        // builder.addCase(fetchSearchedChannelPlaylist.fulfilled, (state, action) => {
        //     state.searchedChannelPlaylist = action.payload;
        //     state.searchedChannelPlaylistLoader = false;
        // })
    }
})

export default videoSlice.reducer;