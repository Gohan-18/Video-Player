import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import styled from '@emotion/styled';
import { addToWatchlist } from "../utils/WatchlistUpdateFunction";
import { useAuth } from "../firebase/Auth";
import { loginMessage } from "../features/watchlist-slice";
import { useDispatch } from "react-redux";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: 10,
    },
}));


export default function VideoCard({videos}) {

    const navigate= useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const navigateVideo = ({id,snippet}) => {
        navigate(`/videodetail/${id.videoId}&${snippet.channelId}`)
    }

    const { snippet, id } = videos;

    // function addToWatchlist(e) {
    //     e.stopPropagation();
    //     console.log('i am clicked!!!');
    // }

  return (
    <Box key={id?.videoId}  >
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
        <LightTooltip title="Add to Watchlist" placement="bottom-end" arrow>
            <IconButton
                onClick={(e) => {
                    user ? addToWatchlist(e, {id, snippet}, user, dispatch) : 
                    dispatch(loginMessage({
                        open: true,
                        message: `Please LogIn First!!`,
                        type: 'error'
                    }))
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
            <CardMedia                 
            component='img' 
            image={snippet?.thumbnails?.high?.url} 
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
    </Box>
  )
}
