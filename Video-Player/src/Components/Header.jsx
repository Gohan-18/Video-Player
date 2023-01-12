import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  borderRadius: '30px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{display: 'flex', justifyContent: 'center', height: '80px'}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
                pr: {
                    xs: '20px',
                    sm: '0px'
                }
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton 
            sx={{
                mx: '10px',
                display: {
                    xs: 'none',
                    sm: 'flex'
                }
                // '&:hover': {
                //     '&.MuiButtonBase-root': {
                //         fill: '#c1121f',
                //         color: '#c1121f',
                //     },
                //     backgroundColor: '#fff'
                // }
                }}>
            <YouTubeIcon 
                fontSize='medium' 
                sx={{
                    fill: '#fff',
                    // '&:hover': {
                    //     fill: '#c1121f'
                    // }
                }} />
          </IconButton>
          <Search sx={{flexGrow: 1}} >
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{width: '100%'}}
            />
          </Search>
          <Box sx={{pl: '20px'}} >
          <IconButton>
            <AccountCircle/>
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}