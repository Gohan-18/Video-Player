import { Typography, Container, Card, CardActionArea, CardContent, CardMedia, Grid, Box, CssBaseline, LinearProgress, Skeleton, IconButton } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Watchlist() {

  const navigate = useNavigate();
  const { watchlist } = useSelector((state) => state?.watchlistSl);
  console.log(watchlist)

  const navigateVideo = ({id,snippet}) => {
    navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
  }

  return (
    <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
        {/* <Typography>Watchlist page</Typography> */}
        <Grid container spacing={3}>

        {watchlist?.map(({snippet,id}) => {
          return (
            <Grid item key={id.videoId} xs={12} sm={6} md={3} >
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

      </Grid>
    </Container>
  )
}
