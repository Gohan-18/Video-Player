import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Box, Typography, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { fetchHomeVideos } from '../features/fetchFromAPI-slice';
import { useTheme } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
// import { fetchVideoDetails } from '../features/fetchFromAPI-slice';

const Home = () => {

  const dispatch = useDispatch();
  const homeVideoList = useSelector((state) => state.homeVideos);
  // console.log(homeVideoList)
  const { homeVideos, loading } = homeVideoList;
  // const { id } = homeVideos;
  const navigate = useNavigate();


  const navigateVideo = ({id,snippet}) => {
    navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
  }

  useEffect(() => {
    dispatch(fetchHomeVideos())
  }, [])
  

  // if(!homeVideos?.length){
  //   dispatch(fetchHomeVideos('search?part=snippet&q=new&maxResults=48'))
  // }

  // function videoPage ({id}) {
  //   dispatch(fetchVideoDetails(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id.videoId}`))
  // }

  // const now = new Date();
  // console.log(now);

  return (
    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
    <CssBaseline/>
    {/* <InfiniteScroll dataLength={homeVideos?.length} loader={<CircularProgress sx={{margin: 'auto'}} />} hasMore={true} > */}
    <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
    {/* <InfiniteScroll dataLength={homeVideos.length} loader={<CircularProgress sx={{mt:'10px'}} />} hasMore={true} > */}

      {loading ? <CircularProgress sx={{mt:'200px'}} /> : 
      
      <Grid container spacing={3}>
        {homeVideos?.map(({snippet,id}) => {
          return (
            
            <Grid item key={id.videoId} xs={12} sm={6} md={3} >
              <Card 
                sx={{
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
    </Container>
    {/* </InfiniteScroll> */}
    </Box>
  )
}

export default Home