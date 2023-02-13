import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SomethingWentWrong() {

    function reloadPage() {
        window.location.reload(false);
    }

  return (
    <Container maxWidth='lg' sx={{px: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "80vh", flexDirection: 'column'}} >
            <Typography sx={{ color: '#dcdcdd', fontSize: {xs: '25px', sm: '30px'}, fontWeight: '600', pt: '40px', textAlign: 'center'}} >
                SOMETHING WENT WRONG...
            </Typography>
            <Typography gutterBottom color='error' sx={{fontWeight: '500', textAlign: 'center'}} >
                PLEASE REFRESH THE PAGE
            </Typography>
                <Typography onClick={reloadPage} sx={{ fontSize: {xs: '10px', sm: '15px'}, mt: '20px', borderRadius: '8px', border: '2px solid #dcdcdd', fontWeight: '500', color: '#dcdcdd', cursor: 'pointer', '&:hover': {backgroundColor: 'none', textDecoration: 'underline', color: '#fff'},px: '20px', py: '10px', textAlign: 'center'}} >Refresh</Typography>
        </Box>
    </Container>
  )
}

export default SomethingWentWrong;