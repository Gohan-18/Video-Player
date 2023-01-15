import { Container, Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchVideoDetails } from '../features/fetchFromAPI-slice';
import CircularProgress from '@mui/material/CircularProgress';

export default function VideoDetail() {

    const theme = useTheme();
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVideoDetails(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`))
    }, [])

    const {videoDetail, loading} = useSelector((state) => state?.home);
    // const {videoDetail, loading} = value;

    const { snippet, statistics } = videoDetail[0];
    const { title, channelTitle } = snippet;
    console.log(snippet, loading);
    // const {snippet} = videoDetail
    // console.log(snippet)




    // if(!videoDetail?.snippet) return <CircularProgress/>;
    
    // console.log(id);

  return (
    <>
        {loading ? 
            <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
                <CircularProgress sx={{mt:'200px'}} />
            </Container>
             : 
            <Grid container spacing={3} sx={{pt: {xs: '90px', sm:'110px'}, px: {xs: '10px', sm: '30px', md: '60px'}}}>
                <Grid item xs={12} md={9} >
                    <Box sx={{display: 'flex', flexDirection: 'column', px: {xs: '0px'}}}>
                        <Box sx={{pb: '30px'}} >
                            <ReactPlayer 
                                url={`https://www.youtube.com/watch?v=${id}`}
                                className='react-player' controls 
                            />
                        </Box >

                        <Box>
                            {/* <Typography variant='h6' color='#fff' fontWeight='bold' sx={{fontSize: '20px'}} >{snippet.title}</Typography> */}
                            <Typography 
                                variant='h5' 
                                component='h2' 
                                gutterBottom 
                                sx={{
                                    fontSize: {
                                        xs: '14px',
                                        sm: '18px',
                                        md: '20px'
                                    }, 
                                    fontWeight: '500'
                                }}>
                                {title}
                            </Typography>
                            <Typography 
                                variant='h5' 
                                component='h2' 
                                gutterBottom 
                                color={theme.palette.text.secondary}
                                sx={{
                                    fontSize: {
                                        xs: '12px',
                                        sm: '16px',
                                        md: '18px'
                                    }, 
                                    fontWeight: '500'
                                }}>
                                {channelTitle}
                            </Typography>
                        </Box>
                    </Box>
                    
                </Grid>
                <Grid item xs={12} md={3} >
                    {/* <Typography>Hello World</Typography>
                    <Typography>Hello World</Typography>
                    <Typography>Hello World</Typography>
                    <Typography>Hello World</Typography>
                    <Typography>Hello World</Typography>
                    <Typography>Hello World</Typography>
                    <Typography>Hello World</Typography> */}
                </Grid>
            </Grid>}
            </>
        //         // }
        // // <Grid container sx={{pt: {xs: '100px', md:'110px'}, px: {xs: '10px', ms: '30px'}}}>
        // //     <Grid item spacing={3} xs={12} md={9} >
        // //         <Box sx={{display: 'flex', flexDirection: 'column', px: {xs: '0px', md: '40px'}}}>
        // //             <Box sx={{pb: '30px'}} >
        // //                 <ReactPlayer 
        // //                     url={`https://www.youtube.com/watch?v=${id}`}
        // //                     className='react-player' controls 
        // //                 />
        // //             </Box >
        // //                 <Typography variant='h6' color='#fff' fontWeight='bold' sx={{fontSize: '20px'}} >{title}</Typography>
        // //             <Box>

        // //             </Box>
        // //         </Box>
                
        // //     </Grid>
        // //     <Grid item xs={12} md={3} >
        // //         {/* <Typography>Hello World</Typography>
        // //         <Typography>Hello World</Typography>
        // //         <Typography>Hello World</Typography>
        // //         <Typography>Hello World</Typography>
        // //         <Typography>Hello World</Typography>
        // //         <Typography>Hello World</Typography>
        // //         <Typography>Hello World</Typography> */}
        // //     </Grid>
        // // </Grid>
        // </>
  )
}
