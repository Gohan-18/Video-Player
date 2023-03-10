import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, LinearProgress, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMoreSearchedChannel, fetchSearchedChannel } from '../features/fetchFromAPI-slice';
import CircularProgress from '@mui/material/CircularProgress';
import VideoCard from './VideoCard';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import { addToWatchlist, channelDetailWatchlist } from '../utils/WatchlistUpdateFunction';
import { useAuth } from '../firebase/Auth';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { loginMessage } from '../features/watchlist-slice';


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 10,
  },
}));

export default function ChannelDetail() {

  const { user } = useAuth();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { channelid } = params;
  const {searchedChannel, loading, playlistId} = useSelector((state) => state?.homeVideos);
  const {searchedChannelPlaylist, searchedChannelPlaylistLoader, nextPageToken} = useSelector((state) => state?.homeVideos);
  // console.log(searchedChannelPlaylist);
    // console.log(searchedChannel);
  const { contentDetails, id, snippet, statistics } = searchedChannel;
  // const playlistId = contentDetails?.relatedPlaylists?.uploads;

  const navigateVideo = ({item}) => {
      navigate(`/videodetail/${item?.snippet?.resourceId?.videoId}&${item?.snippet?.channelId}`)
  }
  // console.log(playlistId)

  // useEffect(() => {
    
  // }, [loading])

  useEffect(() => {
    dispatch(fetchSearchedChannel({channelid}));
    // setTimeout(() => {
    // dispatch(fetchSearchedChannelPlaylist(playlistId));
    // }, 1000)
  }, [channelid])

  function fetchMoreData() {
    dispatch(fetchMoreSearchedChannel({channelid, nextPageToken}))
  }

  function referAddToWatchlist (e, item, user, dispatch) {
    const { id, snippet } = item;
    // console.log({snippet})
    channelDetailWatchlist({snippet}, user, dispatch)
  }

  // if(contentDetails?.relatedPlaylists?.uploads) {
  //   dispatch(fetchSearchedChannelPlaylist(playlistId));
  // }

  // useEffect(() => {
  //   dispatch(fetchSearchedChannelPlaylist(playlistId));
  // }, [channelid])


  // setTimeout(() => {
  //   dispatch(fetchSearchedChannelPlaylist(playlistId));
  // }, 5000)
  

  return (
    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* <InfiniteScroll
      dataLength={searchedChannelPlaylist?.length} 
      // loader={<Typography>Loading...</Typography>} 
      loader={<LinearProgress color="error" sx={{width: '100%', height: '5px', borderRadius: '5px'}} />} 
      hasMore={true} 
      next={fetchMoreData}
      style={{width: '99.5vw',margin: '0 auto'}}
    >{ */}
    <Box>
    {loading ? 
            <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
                <CircularProgress color="error" sx={{mt:'200px'}} />
            </Container>
             : 
    <InfiniteScroll
      dataLength={searchedChannelPlaylist?.length} 
      // loader={<Typography>Loading...</Typography>} 
      loader={<LinearProgress color="error" sx={{width: '100%', height: '5px', borderRadius: '5px'}} />} 
      hasMore={true} 
      next={fetchMoreData}
      style={{width: '99.5vw',margin: '0 auto'}}
    >{
    <Box sx={{pt: '80px', pb: '60px', display: 'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}} >
      <Box 
        sx={{
          position: 'relative',
          height: {xs: '100px', sm: '150px'}, 
          width: '100%', 
          // border: '2px solid red', 
          position: 'relative', 
          background: 'hsla(41, 100%, 70%, 1)', 
          background: 'linear-gradient(90deg, hsla(41, 100%, 70%, 1) 0%, hsla(7, 76%, 47%, 1) 100%)', 
          background: '-moz-linear-gradient(90deg, hsla(41, 100%, 70%, 1) 0%, hsla(7, 76%, 47%, 1) 100%)', 
          background: '-webkit-linear-gradient(90deg, hsla(41, 100%, 70%, 1) 0%, hsla(7, 76%, 47%, 1) 100%)', 
          filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#FFCF67", endColorstr="#D3321D", GradientType=1 )'
        }}>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', px: {xs: '5px', md: '40px'}, position:'relative'}} >
        <CardMedia
          component='img' 
          image={snippet?.thumbnails?.high?.url} 
          alt={id}
          sx={{
            position: 'absolute',
            alignSelf:'center', 
            width:'150px', 
            height:'150px', 
            objectFit:'contain',
            borderRadius: '50%',
            padding: '20px',
            // top: {xs:'110px', sm:'160px'}
            top: '-70px',
            // position: 'absolute',
            // left: '43%',
            // bottom: '-50px'
          }}
        />
        <CardContent 
          sx={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              pt: '80px',
              pb: '30px'
              // width: '100%'
          }}
        >
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
              fontWeight: '500'}}>
              {snippet?.title}
          </Typography>
          {/* <Typography 
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
              fontWeight: '500',
              color: '#7f7f7f'}}>
              {snippet?.customUrl}
          </Typography> */}
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
              fontWeight: '500',
              color: '#7f7f7f'}}>
              {parseInt(statistics?.subscriberCount).toLocaleString()} Subscribers
          </Typography>
        </CardContent>
        {/* <VideoCard videos={searchedChannelPlaylist} /> */}
        <Container maxWidth='lg' sx={{pt:'10px'}} >
          {searchedChannelPlaylistLoader ? <CircularProgress /> : 
        <Grid container spacing={3} >
        {searchedChannelPlaylist?.map((item) => (
          <Grid item key={item?.snippet?.resourceId?.videoId} xs={12} sm={6} md={3}  >
          <Card 
          sx={{
              position: 'relative',
              borderRadius: '10px', 
              background: 'none', 
              margine: '10px',
              transition: '0.5s',
              '&:hover': {
              transform: {
                  xs: 'scale(1.05,1.05)',
                  md:'scale(1.1,1.1)'
              },
              backgroundColor: '#333533',
              }
              }} >
            <LightTooltip title="Add to Watchlist" placement="bottom-end" arrow sx={{zIndex: '55',}} >
              <IconButton
                  onClick={(e) => {
                      e.stopPropagation();
                      user ? referAddToWatchlist(e, item, user, dispatch) : 
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
              navigateVideo({item});
              }}
              >
              <CardMedia                 
              component='img' 
              image={item?.snippet?.thumbnails?.high?.url} 
              alt={item?.snippet?.resourceId?.videoId}
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
              {item?.snippet?.title}
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
                  {item?.snippet.channelTitle}
              </Typography>
              {/* <Typography  
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
                  Published at: {searchedChannelPlaylist?.snippet.publishedAt.slice(0,10)}
              </Typography> */}
              </CardContent>
          </CardActionArea>
          </Card>
          </Grid>
        ))}
        </Grid>}
        </Container>
      </Box>
    </Box>}</InfiniteScroll>}

    </Box>

    </Box>
  )
}
