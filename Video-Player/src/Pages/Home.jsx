import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Box, Typography, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { fetchHomeVideos } from '../features/fetchFromAPI-slice';
import { useTheme } from '@emotion/react';

const Home = () => {

  const dispatch = useDispatch();
  const homeVideoList = useSelector((state) => state.home);
  console.log(homeVideoList)
  const { homeVideos, loading } = homeVideoList;
  const theme = useTheme();

  if(!homeVideos?.length){
    dispatch(fetchHomeVideos('search?part=snippet&q=new&maxResults=48'))
  }

  return (
    <>
    <CssBaseline/>
    <Container maxWidth='lg' sx={{pt: '100px', px: '20px', pb: '60px'}} >
      <Grid container spacing={3}>

        {homeVideos?.map(({snippet,id}) => {
          return (
            <Grid item key={id.videoId} xs={12} sm={6} md={3} >
              <Card 
                sx={{
                  zIndex: '100',
                  borderRadius: '10px', 
                  background: 'none', 
                  margine: '10px',
                  transition: '0.5s',
                  '&:hover': {
                    zIndex: '1000',
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
                  // onClick={(e) =>{ 
                  //   e.stopPropagation();
                  //   navigateProduct({id});
                  // }}
                  >
                  <CardMedia                 
                    component='img' 
                    image={snippet.thumbnails.high.url} 
                    alt={id.videoId}
                    sx={{
                      alignSelf:'center', 
                      width:'100%', 
                      height:'100%', 
                      objectFit:'contain',
                      // borderRadius: '10px'
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
                      Published at: {snippet.publishedAt}
                    </Typography>
                  </CardContent>

                </CardActionArea>
              </Card>
            </Grid>
          )
        })}

      </Grid>
    </Container>
    </>
  )
}

export default Home