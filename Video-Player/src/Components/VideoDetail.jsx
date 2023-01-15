import { Container, Grid, Typography, useTheme, TextField, Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchVideoDetails } from '../features/fetchSingleVideo-slice';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useState } from 'react';

export default function VideoDetail() {

    const theme = useTheme();
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();
    // const count = useRef(4);
    const [rowCount, setrowCount] = useState(4);

    function fullDescription () {
        const rCount = rowCount === 4 ? 0 : 4;
        setrowCount(rCount);
    }

    useEffect(() => {
        dispatch(fetchVideoDetails(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`))
    }, [])

    const {singleVideo, loading} = useSelector((state) => state?.videoDetail);

    // if(!singleVideo?.snippet){
    //     return (
    //         <>
    //         <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
    //             <CircularProgress sx={{mt:'200px'}} />
    //         </Container>
    //         </>
    //     )
    // }

    console.log(singleVideo);
    console.log(loading);

    const { snippet, statistics } = singleVideo;

    // const 
    // const {videoDetail, loading} = value;

    // const { snippet, statistics } = videoDetail[0];
    // const { title, channelTitle } = snippet;
    // console.log(snippet, loading);
    // const {snippet} = videoDetail
    // console.log(snippet)




    // if(!videoDetail?.snippet) return <CircularProgress/>;
    
    // console.log(id);

  return (
    <>
        {!singleVideo?.snippet || loading ? 
            <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
                <CircularProgress sx={{mt:'200px'}} />
            </Container>
             : 
            <Grid container spacing={3} sx={{ pb: '50px' , pt: {xs: '90px', sm:'110px'}, px: {xs: '10px', sm: '30px', md: '60px'}}}>
                <Grid item xs={12} md={9} >
                    <Box sx={{display: 'flex', flexDirection: 'column', px: {xs: '0px'}}}>
                        <Box sx={{pb: '20px'}} >
                            <ReactPlayer 
                                url={`https://www.youtube.com/watch?v=${id}`}
                                className='react-player' controls 
                            />
                        </Box >

                        <Box>
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
                                {snippet?.title}
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
                                {snippet?.channelTitle}
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: '10px', pr: '10px'}} >
                                <Box>
                                    <Typography 
                                        variant='h5' 
                                        component='h2' 
                                        gutterBottom 
                                        color={theme.palette.text.secondary}
                                        sx={{
                                            fontSize: {
                                                xs: '10px',
                                                sm: '14px',
                                                md: '16px'
                                            }, 
                                            fontWeight: '500'
                                        }}>
                                        Uploaded: {snippet.publishedAt.slice(0,10)}
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2}}>
                                    <Typography 
                                        variant='h5' 
                                        component='h2' 
                                        gutterBottom 
                                        color={theme.palette.text.secondary}
                                        sx={{
                                            fontSize: {
                                                xs: '10px',
                                                sm: '14px',
                                                md: '16px'
                                            }, 
                                            fontWeight: '500'
                                        }}>
                                        {parseInt(statistics.viewCount).toLocaleString()} views
                                    </Typography>
                                    <Typography 
                                        variant='h5' 
                                        component='h2' 
                                        gutterBottom 
                                        color={theme.palette.text.secondary}
                                        sx={{
                                            fontSize: {
                                                xs: '10px',
                                                sm: '14px',
                                                md: '16px'
                                            }, 
                                            fontWeight: '500'
                                        }}>
                                        {parseInt(statistics.likeCount).toLocaleString()} likes
                                    </Typography>
                                </Box>
                            
                            </Box>

                            <Box sx={{py: '10px', position: 'relative'}} >
                                <TextField
                                    className="description"
                                    label="Description"
                                    multiline
                                    fullWidth
                                    disabled
                                    rows={rowCount}
                                    defaultValue={snippet?.description}
                                    onClick={fullDescription}
                                    sx={{
                                        fontSize: {
                                            xs: '12px',
                                            sm: '16px',
                                            md: '18px'
                                        },
                                        mt: '40px',
                                        // transition: 'all 1s ease-out',

                                    }}
                                />
                                <Button 
                                    onClick={fullDescription} 
                                    fullWidth  
                                    color="secondary"
                                    sx={{
                                        position: 'absolute', 
                                        top: 0, 
                                        right: 0,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                        },
                                        '&::after': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                        }
                                    }}>
                                    <ArrowDropDownOutlinedIcon sx={{fill: '#fff'}} />
                                </Button>
                                {/* <IconButton sx={{position: 'absolute', top: 0, right: 30}} >
                                    <ArrowDropDownOutlinedIcon/>
                                </IconButton> */}
                            </Box>
                            
                        </Box>
                    </Box>
                    
                </Grid>
                <Grid item container xs={12} md={3} >

                    <Grid item xs={12} >
                        <Typography>Hello World</Typography>
                        <Typography>Hello World</Typography>
                        <Typography>Hello World</Typography>
                        <Typography>Hello World</Typography>
                        <Typography>Hello World</Typography>
                        <Typography>Hello World</Typography>
                        <Typography>Hello World</Typography>
                    </Grid>

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
