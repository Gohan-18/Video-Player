import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'



export default function ChannelCard({channelDetail}) {

    const navigate = useNavigate();

    const navigateChannel = ({id}) => {
        navigate(`/channeldetail/${id.channelId}`)
    }

    const { snippet, id } = channelDetail;


  return (
    <Box key={id?.channelId} sx={{width: '100%', height: '100%'}} >
        <Card 
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
                padding:'10px'
            }}
            onClick={(e) =>{ 
                e.stopPropagation();
                navigateChannel({id});
            }}
            >
            <CardMedia                 
                component='img' 
                image={snippet?.thumbnails?.high?.url} 
                alt={id.channelId}
                sx={{
                padding: '20px',
                width:'200px', 
                height:'200px', 
                objectFit:'contain',
                borderRadius: '50%',
                mb: '8px'
                }}
            />
            <CardContent 
                sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
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
                    fontSize: '12px', 
                    fontWeight: '500'
                }}>
                {snippet.channelTitle}
                </Typography> */}
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
                Created at: {snippet.publishedAt.slice(0,10)}
                </Typography>
            </CardContent>

            </CardActionArea>
        </Card>
    </Box> 
  )
}
