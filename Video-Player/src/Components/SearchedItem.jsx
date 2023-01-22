import { Typography, Container, Card, CardActionArea, CardContent, CardMedia, Grid, Box, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSearchedVideos } from '../features/fetchFromAPI-slice';
import CircularProgress from '@mui/material/CircularProgress';
import ChannelCard from './ChannelCard';
import VideoCard from './VideoCard';


export default function SearchedItem() {

    const params = useParams();
    const { keyword } = params;
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const searchedVideoList = useSelector((state) => state?.homeVideos);
    const { searchedVideos, loading } = searchedVideoList;

    useEffect(() => {
        dispatch(fetchSearchedVideos({keyword}));
    }, [keyword])

    // console.log(searchedVideos)

    // const navigateVideo = ({id,snippet}) => {
    //   navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
    // }

    // const navigateChannel = ({id}) => {
    //   navigate(`/channeldetail/${id.channelId}`)
    // }

  return (
    <>
    <Container maxWidth='lg' sx={{pt: '110px', px: '20px', pb: '60px', display: 'flex', justifyContent: 'center'}} >
      {loading ? <CircularProgress sx={{mt:'200px'}} /> : 
      <Grid container spacing={3}>

        {searchedVideos?.map((item) => {
          let key = item?.id?.kind === 'youtube#channel' ? item?.id.channelId : item?.id?.videoId;
          // console.log(key);
          return (
            <Grid item key={key}  xs={12} sm={6} md={3}  >
            {item?.id.channelId && <ChannelCard channelDetail={item} /> }
            {item?.id?.videoId && <VideoCard videos={item} />}
            </Grid>
          )
        })}

      </Grid>}
    </Container>
    </>
  )
}


//   <Box key={id?.channelId} sx={{width: '100%', height: '100%'}} >
          //   <Card 
          //     sx={{
          //       display: 'flex',
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //       borderRadius: '10px', 
          //       background: 'none', 
          //       margine: '10px',
          //       transition: '0.5s',
          //       '&:hover': {
          //         transform: {
          //           xs: 'scale(1.05,1.05)',
          //           md:'scale(1.1,1.1)'
          //         },
          //         backgroundColor: '#333533',
          //       }
          //       }} >
          //     <CardActionArea
          //       sx={{
          //         height:'100%', 
          //         display:'flex', 
          //         flexDirection:'column', 
          //         position: 'relative',
          //       }}
          //       onClick={(e) =>{ 
          //         e.stopPropagation();
          //         navigateChannel({id});
          //       }}
          //       >
          //       <CardMedia                 
          //         component='img' 
          //         image={snippet?.thumbnails?.high?.url} 
          //         alt={id.channelId}
          //         sx={{
          //           padding: '10px',
          //           width:'200px', 
          //           height:'200px', 
          //           objectFit:'contain',
          //           borderRadius: '50%',
          //           mb: '8px'
          //         }}
          //       />
          //       <CardContent 
          //         sx={{
          //           display: 'flex', 
          //           flexDirection: 'column', 
          //           alignItems: 'center', 
          //           justifyContent: 'center', 
          //           width: '100%'
          //         }} >
          //         <Typography 
          //           variant='h5' 
          //           component='h2' 
          //           gutterBottom 
          //           sx={{
          //             overflow: 'hidden',
          //             textOverflow: 'ellipsis',
          //             display: '-webkit-box',
          //             WebkitLineClamp: '2',
          //             WebkitBoxOrient: 'vertical',
          //             fontSize: '14px', 
          //             fontWeight: '500'
          //         }}>
          //         {snippet.title}
          //         </Typography>
          //         <Typography  
          //           gutterBottom 
          //           paragraph
          //           color='text.secondary'
          //           sx={{
          //             overflow: 'hidden',
          //             textOverflow: 'ellipsis',
          //             display: '-webkit-box',
          //             WebkitLineClamp: '2',
          //             WebkitBoxOrient: 'vertical',
          //             fontSize: '12px', 
          //             fontWeight: '500'
          //         }}>
          //           {snippet.channelTitle}
          //         </Typography>
          //         <Typography  
          //           gutterBottom 
          //           paragraph
          //           color='text.secondary'
          //           sx={{
          //             overflow: 'hidden',
          //             textOverflow: 'ellipsis',
          //             display: '-webkit-box',
          //             WebkitLineClamp: '2',
          //             WebkitBoxOrient: 'vertical',
          //             fontSize: '10px', 
          //             fontWeight: '500'
          //         }}>
          //           Created at: {snippet.publishedAt.slice(0,10)}
          //         </Typography>
          //       </CardContent>

          //     </CardActionArea>
          //   </Card>
          // </Box> }

          // <Box key={id?.videoId} sx={{width: '100%'}} >
          //     <Card 
          //       sx={{
          //         borderRadius: '10px', 
          //         background: 'none', 
          //         margine: '10px',
          //         transition: '0.5s',
          //         '&:hover': {
          //           transform: {
          //             xs: 'scale(1.05,1.05)',
          //             md:'scale(1.1,1.1)'
          //           },
          //           backgroundColor: '#333533',
          //         }
          //         }} >
          //       <CardActionArea
          //         sx={{
          //           height:'100%', 
          //           display:'flex', 
          //           flexDirection:'column', 
          //           position: 'relative',
          //         }}
          //         onClick={(e) =>{ 
          //           e.stopPropagation();
          //           navigateVideo({id,snippet});
          //         }}
          //         >
          //         <CardMedia                 
          //           component='img' 
          //           image={snippet.thumbnails.high.url} 
          //           alt={id.videoId}
          //           sx={{
          //             alignSelf:'center', 
          //             width:'100%', 
          //             height:'100%', 
          //             objectFit:'contain',
          //             borderTopLeftRadius: '10px',
          //             borderTopRightRadius: '10px',
          //           }}
          //         />
          //         <CardContent 
          //           sx={{
          //             display: 'flex', 
          //             flexDirection: 'column', 
          //             alignItems: 'flex-start', 
          //             justifyContent: 'center', 
          //             width: '100%'
          //           }} >
          //           <Typography 
          //             variant='h5' 
          //             component='h2' 
          //             gutterBottom 
          //             sx={{
          //               overflow: 'hidden',
          //               textOverflow: 'ellipsis',
          //               display: '-webkit-box',
          //               WebkitLineClamp: '2',
          //               WebkitBoxOrient: 'vertical',
          //               fontSize: '14px', 
          //               fontWeight: '500'
          //           }}>
          //           {snippet.title}
          //           </Typography>
          //           <Typography  
          //             gutterBottom 
          //             paragraph
          //             color='text.secondary'
          //             sx={{
          //               overflow: 'hidden',
          //               textOverflow: 'ellipsis',
          //               display: '-webkit-box',
          //               WebkitLineClamp: '2',
          //               WebkitBoxOrient: 'vertical',
          //               fontSize: '12px', 
          //               fontWeight: '500'
          //           }}>
          //             {snippet.channelTitle}
          //           </Typography>
          //           <Typography  
          //             gutterBottom 
          //             paragraph
          //             color='text.secondary'
          //             sx={{
          //               overflow: 'hidden',
          //               textOverflow: 'ellipsis',
          //               display: '-webkit-box',
          //               WebkitLineClamp: '2',
          //               WebkitBoxOrient: 'vertical',
          //               fontSize: '10px', 
          //               fontWeight: '500'
          //           }}>
          //             Published at: {snippet.publishedAt.slice(0,10)}
          //           </Typography>
          //         </CardContent>

          //       </CardActionArea>
          //     </Card>
          //   </Box>}