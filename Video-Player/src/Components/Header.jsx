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
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
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



export default function Header() {

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedTerm, setFeedTerm] = useState('');
  const navigate = useNavigate();

  function navigateSearch(e) {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }

  function navigateFeedSearch({inrText}) {
    setFeedTerm(inrText);
    navigate(`/feed/${inrText}`);
  }

  function navigateHome() {
    navigate('/');
  }

  const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    height: '80px', 
    justifyContent: 'center',
  }));

  // console.log(feedTerm);

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
                }
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
          <IconButton 
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              },
            }} >
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
            width:drawerWidth,
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
          <ListItem disablePadding sx={{backgroundColor: '#c1121f', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

