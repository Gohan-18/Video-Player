import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiAppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Box, Button, Menu, MenuItem, Tooltip } from "@mui/material"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { signInWithGoogle, useAuth } from '../firebase/Auth';
// import { categories } from '../utils/constants';


const drawerWidth = 220;
const xsDrawerWidth = 80;

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

const settings = ['Profile', 'Watchlist', 'Logout'];


export default function Header() {

  const theme = useTheme();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedTerm, setFeedTerm] = useState('');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function navigateSearch(e) {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }

  async function logOut () {
    await signOut();
  }

  function navigateFeedSearch({inrText}) {
    setFeedTerm(inrText);
    navigate(`/feed/${inrText}`);
  }

  function navigateHome() {
    navigate('/');
    setSearchTerm('');
  }

  function menuAction({inrText}) {
    // console.log(inrText);
    if(inrText === 'Logout') {
      handleCloseUserMenu()
      logOut();
      navigateHome();
    }

    if(inrText === 'Profile') {
      console.log('Profilleeee')
      handleCloseUserMenu()
      navigate('/profile')
    }

    if(inrText === 'Watchlist') {
      console.log('Watchlisteee')
      handleCloseUserMenu()
      navigate('/watchlist')
    }

  }

  const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    minHeight: '80px', 
    justifyContent: 'center',
  }));


  // console.log(theme.mixins);

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
                xs: '15px',
                sm: '0px'
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <IconButton 
            onClick={navigateHome}
            sx={{
                mx: '10px',
                display: {
                    xs: 'none',
                    sm: 'flex'
                },
                '&:hover': {
                    // '&.MuiButtonBase-root': {
                    //     fill: '#c1121f',
                    //     color: '#c1121f',
                    // },
                    backgroundColor: '#fff'
                }
                }}> */}
            <YouTubeIcon 
                onClick={navigateHome}
                fontSize='medium' 
                sx={{
                    display: {
                      xs: 'none',
                      sm: 'flex'
                    },
                    padding: '10px',
                    width: '50px',
                    height: '50px',
                    // border: '2px solid red',
                    borderRadius: '50%',
                    fill: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.4s',
                    mx: '5px',
                    '&:hover': {
                        fill: '#c1121f',
                        backgroundColor: '#fff'
                    }
                }} />
          {/* </IconButton> */}
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
            {!user ? <Button onClick={signInWithGoogle} size='small' sx={{ borderRadius: '5px', color: '#a5a5a5', fontWeight: '500' , '&:hover' : {color: '#fff', backgroundColor: '#595959'}}} >Login</Button> :
            
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.displayName || user.email} src={user.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => {
                  // console.log(e.target.innerText)
                  const inrText = e.target.innerText;
                  menuAction({inrText})
                  // handleCloseUserMenu()
                } }>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          //   <IconButton 
          //   onClick={logOut}
          //   sx={{
          //     display: {
          //       xs: 'none',
          //       sm: 'flex'
          //     },
          //   }} >
          //   <Avatar alt={user.displayName || user.email} src={user.photoURL} />
          // </IconButton>
           }
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width:drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width:drawerWidth,
            boxSizing: 'border-box',
          },
          overflow: 'scroll'
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }} >
          <YouTubeIcon/>
          <Typography>YouTube</Typography>
        </DrawerHeader>
        <Divider />

        {/* {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "white",
        }}
        key={category.name}
      >
        <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
          {category.name}
        </span>
      </button>
    ))} */}
        {/* <List>
          {categories.map((category) => (
            <ListItem key={category.name} disablePadding sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
              <ListItemButton>
                <ListItemIcon>
                  {category.icon}
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

        <List>
          <ListItem disablePadding sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ListItemButton 
              onClick={navigateHome}
              >
              <ListItemIcon>
                <HomeRoundedIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText  primary='Home' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding >
            <ListItemButton 
                onClick={(e) => {
                  setOpen(!open);
                  setSearchTerm('');
                  const inrText = e.target.innerText;
                  setFeedTerm(inrText);
                  navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon  >
                <WhatshotOutlinedIcon sx={{width:'24px'}} />
              </ListItemIcon>
              <ListItemText  primary='Trending' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open)
                setSearchTerm('')
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <MusicNoteIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText  primary='Music' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open)
                setSearchTerm('');
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                < SchoolIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText primary='Education' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setSearchTerm('');
                setOpen(!open);
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <GraphicEqIcon sx={{width:'24px'}} />
              </ListItemIcon>
              <ListItemText  primary='Podcasts' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open);
                setSearchTerm('');
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <OndemandVideoIcon sx={{width:'24px'}} />
              </ListItemIcon>
              <ListItemText  primary='Movie' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open);
                setSearchTerm('');
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <SportsEsportsIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText  primary='Gaming' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open);
                setSearchTerm('');
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <LiveTvIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText primary='Live' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open);
                setSearchTerm('');
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <FitnessCenterIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText  primary='Sports' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding >
            <ListItemButton 
              onClick={(e) => {
                setOpen(!open);
                setSearchTerm('');
                const inrText = e.target.innerText;
                navigateFeedSearch({inrText})
                }}
              >
              <ListItemIcon>
                <CheckroomIcon sx={{width:'24px'}}/>
              </ListItemIcon>
              <ListItemText primary='Fashion' />
            </ListItemButton>
          </ListItem>
          
          <Divider />

          <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', padding: '10px', flexWrap: 'wrap'}} >
          <Typography variant='h6' sx={{fontSize: '12px'}} ><a href='https://prabhat-portfolio-18.netlify.app/index.html' target="_blank"> Prabhat's Portfolio </a> </Typography>
          <Typography variant='h6' sx={{fontSize: '12px', ml: '3px'}}>• <a href="mailto:pkjha187@gmail.com">Contact</a></Typography>
          <Typography variant='h6' sx={{fontSize: '12px'}} >© 2023 Prabhat</Typography>
        </Box>
        </List>
      </Drawer>
    </Box>
  );
}

