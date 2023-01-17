import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box } from "@mui/material"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import CodeIcon from '@mui/icons-material/Code';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { categories } from '../utils/SidebarList';


const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

const Search = styled('form')(({ theme }) => ({
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

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
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
    // width: '400px',
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: {
    //   xs: `calc(100% - ${drawerWidth}px)`,
    //   md: `calc(100% - ${drawerWidth}px)`
    // },
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    // marginLeft: {
    //   xs: `${xsDrawerWidth}px`,
    //   md:`${drawerWidth}px`
    // },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Header() {

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedSearchTerm, setFeedSearchTerm] = useState('');
  const navigate = useNavigate();

  function navigateSearch(e) {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }

  function navigateFeedSearch({inrText}) {
    // setFeedSearchTerm(e.target.innerText);
    console.log(inrText);
    navigate(`/feed/${inrText}`);
  }

  function navigateHome() {
    navigate('/');
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    // visibility: 'hidden',
    // opacity: '0',
    // zIndex: '-20',
    alignItems: 'center',
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    height: '80px', 
    justifyContent: 'center',
  }));


  console.log(searchTerm)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open} sx={{display: 'flex', justifyContent: 'center', height: '80px'}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            sx={{
                mr: {
                    xs: '20px',
                    sm: '0px'
                }
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton 
            onClick={navigateHome}
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
          <Search sx={{flexGrow: 1}} onSubmit={(e) => navigateSearch(e)} >
            <SearchIconWrapper type='submit' >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{width: '100%'}}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Search>
          <Box sx={{pl: '20px'}} >
          <IconButton>
            <AccountCircle/>
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width:drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
            <Typography>Menu</Typography>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={navigateHome}
                >
                <ListItemIcon>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
          {/* {categories.map(({name, icon}) => (
            <ListItem key={name} disablePadding>
              <ListItemButton 
                onClick={(e) => {
                  const inrText = e.target.innerText;
                  // setFeedSearchTerm(inrText);
                  navigateFeedSearch({inrText})
                  }}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))} */}
          {['Music', 'Education', 'Podcasts', 'Movies', 'Gaming', 'Live', 'Sports', 'Fashion'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton 
                onClick={(e) => {
                  const inrText = e.target.innerText;
                  // setFeedSearchTerm(inrText);
                  navigateFeedSearch({inrText})
                  }}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

