import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL ='https://youtube-v31.p.rapidapi.com';

const options = {
	headers: {
		'X-RapidAPI-Key': 'd460d4d2c0mshd8b49013829f012p100650jsn82ae708c273d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

export const fetchVideoDetails = createAsyncThunk('fetch/videoDetail', async (url) => {

    const data = await fetch(`${BASE_URL}/${url}`, options);
    const result = await data.json();
    // console.log(result);
    return result.items[0];

})

export const fetchVideoSuggestion = createAsyncThunk('fetch/videoSuggestion', async (url) => {

    const data = await fetch(`${BASE_URL}/${url}`, options);
    const result = await data.json();
    // console.log(result);
    return result.items;

})


const singleVideoSlice = createSlice({
    name: 'videoDetail',
    initialState: {
        singleVideo: {},
        videoSuggestion : [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchVideoDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchVideoDetails.fulfilled, (state, action) => {
            state.singleVideo = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchVideoSuggestion.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchVideoSuggestion.fulfilled, (state, action) => {
            state.videoSuggestion = action.payload;
            state.loading = false;
        })
    }
})

export default singleVideoSlice.reducer;