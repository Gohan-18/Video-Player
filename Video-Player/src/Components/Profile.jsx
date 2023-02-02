import { Avatar, Typography } from '@mui/material';
import { Box, Container, TextField, Button, IconButton } from '@mui/material';
import React from 'react';
import { useAuth } from '../firebase/Auth'; 
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut();
    navigate('/');
  };

  function navigateToMyAccount() {
    navigate('/account');
  };

  console.log(user)

  return (
    <>
    <Container maxWidth='lg' sx={{position: 'relative'}} >
    <Container maxWidth='sm' sx={{pt: '80px'}} >
        <Box pt={5} pb={3} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant='h6' sx={{fontSize: '32px', borderBottom: '3px solid gray', px:'10px',}}>Profile Details</Typography>
        </Box>
        <Box sx={{pb:6, px:{ xs :'20px', sm: '0'}}}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '20px'}} >
              <IconButton sx={{width:'100px', height: '100px'}} >
                  <Avatar sx={{width:'80px', height: '80px'}} alt={user?.displayName || user?.email} src={user?.photoURL} />
              </IconButton>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px'}} >
            <TextField
              id="name-input"
              disabled
              label='Name'
              defaultValue={user.displayName}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                width:'100%'
              }}
            />
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} >
            <TextField
              disabled
              id="email-input"
              label='Email Id'
              defaultValue={user.email}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                width:'100%'
              }}
            />
          </Box>
        </Box>
        <Container maxWidth='sm' sx={{position: 'fixed', bottom: 100, left:0, right:0}}>
          <Button fullWidth variant='contained' color='error' onClick={logOut}>LogOut</Button>
        </Container>
    </Container>
    </Container>
    </>
  )
}
