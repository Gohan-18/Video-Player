import { Typography, Container, Card, CardActionArea, CardContent, CardMedia, Grid, Box, CssBaseline, LinearProgress, Skeleton, IconButton } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMoreSearchedVideos, fetchSearchedVideos } from '../features/fetchFromAPI-slice';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonComponent from './Skeleton';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import styled from '@emotion/styled';
import { db, useAuth } from '../firebase/Auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { addToWatchlist } from '../utils/WatchlistUpdateFunction';
import { loginMessage } from '../features/watchlist-slice';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 10,
  },
}));


export default function Feed() {

    const { user } = useAuth();
    const params = useParams();
    const { keyword } = params;
    // console.log(keyword)
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const searchedVideoList = useSelector((state) => state?.homeVideos);
    const { searchedVideos, loading, nextPageToken } = searchedVideoList;

    useEffect(() => {
        dispatch(fetchSearchedVideos({keyword}));
    }, [keyword])

    // console.log(searchedVideos)

    // async function addToWatchlist(e, videoInfo ) {
    //   e.stopPropagation();
    //   // dispatch(addWatchlist({videoInfo}))
    //   // console.log('i am clicked!!!');
    //   const watchlistRef = doc(db, 'watchlist', user.uid);
    //   const docSnap = await getDoc(watchlistRef);
    //   const videos = docSnap.data().videos;
  
    //   if(videos.length) {
    //     const existingItem = videos.find(({id}) => id.videoId === videoInfo.id.videoId);
  
    //     if(existingItem) {
    //       console.log('Already in the wishlist...')
    //     }
    //     else{
    //       // state.watchlist = [...state.watchlist, videoInfo]
    //       try {
    //         console.log('addtoFirestore called on click')
    //         await setDoc(watchlistRef, {
    //           videos: [...videos, videoInfo]
    //         }, { merge: true })
    //       } catch (error) {
    //         console.log(error)
    //       } 
    //     }
    //   }
    //   else{
    //     console.log('No video in the firestore');
    //     try {
    //       console.log('addtoFirestore called on click(no data in firestore)')
    //       await setDoc(watchlistRef, {
    //         videos: [videoInfo]
    //       }, { merge: true })
    //     } catch (error) {
    //       console.log(error)
    //     } 
    //   }
    // }

    function fetchData () {
      dispatch(fetchMoreSearchedVideos({keyword,nextPageToken}));
      // fetchMoreSearchedVideos
      // console.log('helloworld')
    }

    const navigateVideo = ({id,snippet}) => {
        navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
    }

  return (
    // <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
    //     <Typography>Hello {keyword}</Typography>
    // </Container>
    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <InfiniteScroll
      dataLength={searchedVideos?.length} 
      loader={<LinearProgress color="error" sx={{width: '100%', height: '5px', borderRadius: '5px'}} />} 
      hasMore={true} 
      next={fetchData}
      style={{width: '100%',mx: 'auto'}}
    >{
    <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
      {loading ? <SkeletonComponent /> : 
      <Grid container spacing={3}>

        {searchedVideos?.map(({snippet,id}) => {
          return (
            <Grid item key={`${id.videoId}/dd${Math.floor((Math.random() * 100) + 1)}`} xs={12} sm={6} md={3} >
              <Card 
                sx={{
                  borderRadius: '10px', 
                  background: 'none', 
                  margine: '10px',
                  transition: '0.5s',
                  position: 'relative',
                  '&:hover': {
                    transform: {
                      xs: 'scale(1.05,1.05)',
                      md:'scale(1.1,1.1)'
                    },
                    backgroundColor: '#333533',
                  }
                  }} >
                  <LightTooltip title="Add to Watchlist" placement="bottom-end" arrow>
                  <IconButton
                      onClick={(e) => {
                        user ? addToWatchlist(e, {id, snippet}, user, dispatch) : 
                        dispatch(loginMessage({
                          open: true,
                          message: `Please LogIn First!!`,
                          type: 'error'
                        }));

                      }}
                      sx={{
                      position:'absolute', 
                      top: '10px', 
                      right: '10px', 
                      zIndex: '50', 
                      backgroundColor: '#393d3faf', 
                      transition: '0.5s' , 
                      '&:hover':{ 
                          backgroundColor: '#393d3f' 
                      }
                      }} >
                      <QueueOutlinedIcon sx={{fill: '#fff',width: '20px', height: '20px',}} />
                  </IconButton>
                  </LightTooltip>
                <CardActionArea
                  sx={{
                    height:'100%', 
                    display:'flex', 
                    flexDirection:'column', 
                    position: 'relative',
                  }}
                  onClick={(e) =>{ 
                    e.stopPropagation();
                    navigateVideo({id,snippet});
                  }}
                  >
                  <CardMedia                 
                    component='img' 
                    image={snippet?.thumbnails?.high?.url} 
                    alt={id.videoId}
                    sx={{
                      alignSelf:'center', 
                      width:'100%', 
                      height:'100%', 
                      maxHeight: '360px',
                      objectFit:'contain',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                  <CardContent 
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start', 
                      justifyContent: 'center', 
                      width: '100%'
                    }} >
                    <Typography 
                      variant='h5' 
                      component='h2' 
                      gutterBottom 
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        fontSize: '14px', 
                        fontWeight: '500'
                    }}>
                    {snippet.title}
                    </Typography>
                    <Typography  
                      gutterBottom 
                      paragraph
                      color='text.secondary'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        fontSize: '12px', 
                        fontWeight: '500'
                    }}>
                      {snippet.channelTitle}
                    </Typography>
                    <Typography  
                      gutterBottom 
                      paragraph
                      color='text.secondary'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        fontSize: '10px', 
                        fontWeight: '500'
                    }}>
                      Published at: {snippet.publishedAt.slice(0,10)}
                    </Typography>
                  </CardContent>

                </CardActionArea>
              </Card>
            </Grid>
          )
        })}

      </Grid>}
    </Container>}
    </InfiniteScroll>
    </Box>
  )
}
