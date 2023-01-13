import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL ='https://youtube-v31.p.rapidapi.com';

const options = {
	headers: {
		'X-RapidAPI-Key': 'd460d4d2c0mshd8b49013829f012p100650jsn82ae708c273d',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// fetch('https://youtube-v31.p.rapidapi.com/captions?part=snippet&videoId=M7FIvfx5J10', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

export const fetchHomeVideos = createAsyncThunk('fetch/homeVideos', async (url) => {
    const data = await fetch(`${BASE_URL}/${url}`, options)
    const result = await data.json();
    console.log(result.items);
    return result.items;
	// .then(response => response.json())
	// .then(response => console.log(response))
	// .catch(err => console.error(err));
});


const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        homeVideos: [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchHomeVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchHomeVideos.fulfilled, (state, action) => {
            state.homeVideos = action.payload;
            // console.log(homeVideos);
            state.loading = false;
        })
    }
})

export default videoSlice.reducer;