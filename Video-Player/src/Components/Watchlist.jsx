import { Typography, Container, Card, CardActionArea, CardContent, CardMedia, Grid, Box, CssBaseline, LinearProgress, Skeleton, IconButton, CircularProgress, styled } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchAddWatchlist, removeFromWatchlist } from '../features/watchlist-slice';
import { db, useAuth } from '../firebase/Auth';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 10,
  },
}));

export default function Watchlist() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { watchlist, loading } = useSelector((state) => state?.watchlistSl);
  console.log(watchlist)

  const navigateVideo = ({id,snippet}) => {
    navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
  }

  const fetchRemoveFromWatchlist = async ({id}) => {
    console.log('fetchremoveWatchlist called...')
    const watchlistRef = doc(db, 'watchlist', user?.uid);
    const docSnap = await getDoc(watchlistRef);
    const videos = docSnap.data().videos;
    const rmvVideo = videos.filter(({ id : fireId }) => (fireId.videoId !== id.videoId));

    try {
      console.log('removeFirestore called on click')
      await setDoc(watchlistRef, {
        videos: rmvVideo
      }, { merge: true })
    } catch (error) {
      console.log(error)
    } 

    dispatch(removeFromWatchlist({id}))
}

  useEffect(() => {
    if(user){
      dispatch(fetchAddWatchlist({user}));
    }
  }, [])
  

  return (
    <>
    {loading ? 
      <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
          <CircularProgress color="error" sx={{mt:'200px'}} />
      </Container>
        : 
      <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
          {watchlist.length ? 
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
                  <LightTooltip title="Remove from Watchlist" placement="bottom-end" arrow>
                    <IconButton
                      onClick={(e) => {
                        console.log('Please log in...');
                        fetchRemoveFromWatchlist({id})
                      }}
                      sx={{
                        position:'absolute', 
                        top: '10px', 
                        right: '10px', 
                        zIndex: '50', 
                        backgroundColor: '#393d3faf', 
                        transition: '0.5s' , 
                        '&:hover':{ 
                          backgroundColor: '#e5383b' 
                        }
                      }} >
                      <PlaylistRemoveOutlinedIcon sx={{fill: '#fff',width: '20px', height: '20px',}} />
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

        </Grid>: 
        <Box sx={{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
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
              fontWeight: '500', 
              color: '#c1121f'
          }}
          >No Item in the Watchlist!!</Typography>
        </Box>
        }
      </Container>}
    </>
  )
}
