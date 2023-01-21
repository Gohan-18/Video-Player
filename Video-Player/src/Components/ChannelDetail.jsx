import { CardContent, CardMedia, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchedChannel } from '../features/fetchFromAPI-slice';
import VideoCard from './VideoCard';


export default function ChannelDetail() {

  const params = useParams();
  const dispatch = useDispatch();
  const {searchedChannel} = useSelector((state) => state?.homeVideos);
  console.log(searchedChannel);
  const { contentDetails, id, snippet, statistics: {subscriberCount, hiddenSubscriberCount, videoCount, viewCount} } = searchedChannel;
  const { channelid } = params;


  // useEffect(() => {
  //   dispatch(fetchSearchedChannel({channelid}));
  // }, [channelid])
  

  return (
    <>
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
            position: 'fixed',
            alignSelf:'center', 
            width:'150px', 
            height:'150px', 
            objectFit:'contain',
            borderRadius: '50%',
            padding: '20px',
            top: {xs:'110px', sm:'160px'}
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
              {parseInt(subscriberCount).toLocaleString()} Subscribers
          </Typography>
        </CardContent>
        {/* <VideoCard/> */}
      </Box>
    </Box>
    </>
  )
}
