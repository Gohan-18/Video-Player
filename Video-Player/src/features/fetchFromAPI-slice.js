import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL ='https://youtube-v31.p.rapidapi.com';

const options = {
	headers: {
		'X-RapidAPI-Key': 'd460d4d2c0mshd8b49013829f012p100650jsn82ae708c273d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

export const fetchHomeVideos = createAsyncThunk('fetch/homeVideos', async (url) => {
    const data = await fetch(`${BASE_URL}/${url}`, options)
    const result = await data.json();
    // console.log(result.items);
    return result.items;
});

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
        // videoDetail: [],
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
        // builder.addCase(fetchVideoDetails.pending, (state) => {
        //     state.loading = true;
        // })
        // builder.addCase(fetchVideoDetails.fulfilled, (state, action) => {
        //     state.videoDetail = action.payload;
        //     state.loading = false;
        // })
    }
})

export default videoSlice.reducer;