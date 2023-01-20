import { Container, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSearchedChannel } from '../features/fetchFromAPI-slice';


export default function ChannelDetail() {

  const params = useParams();
  const dispatch = useDispatch();
  const {searchedChannel} = useSelector((state) => state?.homeVideos);
  console.log(searchedChannel);
  const { channelid } = params;


  useEffect(() => {
    dispatch(fetchSearchedChannel({channelid}));
  }, [channelid])
  

  return (
    <>
    <Container maxWidth='lg' sx={{pt: '110px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
      <Typography>{channelid}</Typography>
    </Container>
    </>
  )
}
