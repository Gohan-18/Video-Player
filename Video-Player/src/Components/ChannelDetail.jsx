import { Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ChannelDetail() {

  const params = useParams();
  const { channelid } = params;

  return (
    <>
    <Container maxWidth='lg' sx={{pt: '110px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
       <Typography>{channelid}</Typography>
    </Container>
    </>
  )
}
