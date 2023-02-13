import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {

    const navigate = useNavigate();

    function navigateHome() {
        navigate('/');
    }

  return (
    <Container maxWidth='lg' sx={{px: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "80vh", flexDirection: 'column'}} >
            <Typography sx={{ color: '#dcdcdd', fontSize: {xs: '40px', sm: '60px'}, fontWeight: '600', pt: '40px', textAlign: 'center'}} >
                ERROR 404 :(
            </Typography>
            <Typography gutterBottom color='error' sx={{fontWeight: '600', textAlign: 'center'}} >
                PAGE NOT FOUND
            </Typography>
                <Typography onClick={navigateHome} sx={{ fontSize: {xs: '15px', sm: '20px'}, mt: '20px', borderRadius: '8px', border: '2px solid #dcdcdd', fontWeight: '500', color: '#dcdcdd', cursor: 'pointer', '&:hover': {backgroundColor: 'none', textDecoration: 'underline', color: '#fff'},px: '20px', py: '10px', textAlign: 'center'}} >Return Home</Typography>
        </Box>
    </Container>
  )
}

export default ErrorPage