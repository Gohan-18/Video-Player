import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Box, Typography, CssBaseline, LinearProgress, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { fetchHomeVideos, fetchMoreHomeVideos } from '../features/fetchFromAPI-slice';
import { useTheme } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonComponent from '../Components/Skeleton';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import styled from '@emotion/styled';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, useAuth } from '../firebase/Auth';
import { useState } from 'react';
import { addWatchlist, addWatchlistFromFirestore, loginMessage } from '../features/watchlist-slice';
import { addToWatchlist } from '../utils/WatchlistUpdateFunction';
// import { fetchVideoDetails } from '../features/fetchFromAPI-slice';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 10,
  },
}));


const Home = () => {

  const { user } = useAuth();
  // console.log(user);
  const dispatch = useDispatch();
  const homeVideoList = useSelector((state) => state.homeVideos);
  const { watchlist, watcher } = useSelector((state) => state?.watchlistSl);
  console.log(watchlist)
  const { homeVideos, loading, nextPageToken } = homeVideoList;
  // const { id } = homeVideos;
  const navigate = useNavigate();
  // const [watchlist, setWatchlist] = useState([]);
  // console.log(watchlist)
  // console.log(nextPageToken);

  const navigateVideo = ({id,snippet}) => {
    navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
  }

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
    
  //   // try {
  //   //   console.log('addtoFirestore called on click')
  //   //   await setDoc(watchlistRef, {
  //   //     videos: watchlist ? [...watchlist, videoInfo] : [videoInfo]
  //   //   }, { merge: true })
  //   // } catch (error) {
  //   //   console.log(error)
  //   // } 
  //   // dispatch(addWatchlist({videoInfo}))
  // }

  // async function watchlistSetFirestore () {
  //   if(user) {
  //     const watchlistRef = doc(db, 'watchlist', user.uid);
    
  //     try {
  //       await setDoc(watchlistRef, {
  //         videos: watchlist
  //       }, { merge: true })
  //     } catch (error) {
  //       console.log(error)
  //     } 
  //   }

  // }

  // useEffect(() => {
  //   console.log('watcher useeffect');
  //   watchlistSetFirestore();
  // }, [watcher])

  // async function getFirestoreData () {
  //   // console.log(user?.uid)
  //   const watchlistRef = doc(db, 'watchlist', user?.uid);
  //   const docSnap = await getDoc(watchlistRef);
  //   const {videos} = docSnap.data();
  //   // console.log(videos);
  //   dispatch(addWatchlistFromFirestore({videos}))
  // }

    useEffect(() => {
      dispatch(fetchHomeVideos());
    }, [])

    // if(user) {
    //   getFirestoreData()
    // }

    // if(!loading) {
    //   getFirestoreData()
    // }

  function fetchData () {
    console.log('hello world')
    dispatch(fetchMoreHomeVideos(nextPageToken))
  }

  // if(user){
  //   dispatch(loginMessage({
  //     open: true,
  //     message: `Welcome ${user.displayName}`,
  //     type: 'success'
  //   }))
  // }
  

  // if(!homeVideos?.length){
  //   dispatch(fetchHomeVideos('search?part=snippet&q=new&maxResults=48'))
  // }

  // function videoPage ({id}) {
  //   dispatch(fetchVideoDetails(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id.videoId}`))
  // }

  // const now = new Date();
  // console.log(now);

  return (
    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
    <CssBaseline/>
    <InfiniteScroll
      dataLength={homeVideos?.length} 
      // loader={<SkeletonComponent />} 
      loader={<LinearProgress color="error" sx={{width: '100%', height: '5px', borderRadius: '5px'}} />} 
      hasMore={true} 
      next={fetchData}
      style={{width: '100%'}}
    >{
    <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
    {/* <InfiniteScroll dataLength={homeVideos.length} loader={<CircularProgress sx={{mt:'10px'}} />} hasMore={true} > */}

      {loading ? <SkeletonComponent /> : 
      
      <Grid container spacing={3}>
        {homeVideos?.map(({snippet,id}) => {
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
                    {/* <IconButton
                      onClick={(e) => addToWatchlist(e)}
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
                    </IconButton> */}
                  <CardMedia                 
                    component='img' 
                    image={snippet.thumbnails.high.url} 
                    alt={id.videoId}
                    sx={{
                      alignSelf:'center', 
                      width:'100%', 
                      height:'100%', 
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
      {/* </InfiniteScroll> */}
    </Container>}
    </InfiniteScroll>
    </Box>
  )
}

export default Home