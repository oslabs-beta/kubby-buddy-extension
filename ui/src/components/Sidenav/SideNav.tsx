// display system wide command menu
// contains Quickview component
/*

*/
import React, { FC, useContext, useEffect } from 'react';
import { GlobalCommands } from '../GlobalCommands/GlobalCommands';
import { UserContext } from '../../UserContext';
import favicon from '../../../public/favicon.png';
import { Container } from '../../types';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import ResponsiveAppBar from './Navbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const ddClient = createDockerDesktopClient();
const pages = ['Images', 'Containers', 'Dashboard'];

export const SideNav: FC = () => {
  // const testimage = require('../../assests/test.png')
  const {
    setStoppedContainers,
    setRunningContainers,
    setAvailableImages,
    setShowing,
    setAvailableVolumes
  } = useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // INITIAL LOAD
    async function getRunningContainers() {
      try {
        let data: any;
        await ddClient.docker.cli
          .exec('ps', ['--all', '--format', '"{{json .}}"'])
          .then((result) => (data = result.parseJsonLines()));

        //     await promisifyExec(
        // 	"docker ps -a --format '{{json .}}'"
        // );
        // const getURL = 'container/all-active-containers';
        // const fetchResponse = await fetch(getURL);
        // const data: Container[] = await fetchResponse.json();

        console.log(data);

        setRunningContainers(data?.filter((container: any) => container.State !== 'exited'));
        setStoppedContainers(data?.filter((container: any) => container.State === 'exited'));
      } catch (error) {
        console.log(error);
      }
    }
    async function getAvailableImages() {
      try {
        let data: any;
        await ddClient.docker.cli
          .exec('images', ['--format', '"{{json .}}"'])
          .then((result) => (data = result.parseJsonLines()));
        // const getURL = 'image/all-images';
        // const fetchResponse = await fetch(getURL);
        // const data = await fetchResponse.json();
        console.log(data);
        setAvailableImages(data);
      } catch (error) {
        setAvailableImages([]);

        console.log(error);
        console.log('hi');
      }
    }
    async function getAvailableVolumes() {
      try {
        let data: any;
        await ddClient.docker.cli
          .exec('volume', ['ls', '--format', '"{{json .}}"'])
          .then((result) => (data = result.parseJsonLines()));
        // const getURL = 'volume/all-volumes';
        // const fetchResponse = await fetch(getURL);
        // const data = await fetchResponse.json();

        setAvailableVolumes(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAvailableVolumes();
    getRunningContainers();
    getAvailableImages();
  }, []);

  return (
    <AppBar
      position='static'
      sx={{ backgroundColor: 'transparent', border: 'none', width: '100%' }}
    >
      <Toolbar
        disableGutters
        sx={{ backgroundColor: 'transparenty', border: 'none', borderBottom: '1px solid #1976d2' }}
      >
        <Avatar
          src={favicon}
          alt='Custom Image'
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ marginLeft: '1em' }}>
                <Typography textAlign='center'>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant='h5'
          noWrap
          component='a'
          href=''
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
            onClick={() => setShowing('Images')}
            sx={{ my: 2, color: 'white', display: 'block', marginLeft: '2em' }}
          >
            Images
          </Button>
          <Button
            onClick={() => setShowing('Containers')}
            sx={{ my: 2, color: 'white', display: 'block', marginLeft: '2em' }}
          >
            Containers
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    // <AppBar position='static'>
    //   <Toolbar disableGutters>
    //   <Typography
    //     variant='h6'
    //     noWrap
    //     component='a'
    //     href='/'
    //     sx={{
    //       mr: 2,
    //       display: { xs: 'none', md: 'flex' },
    //       fontFamily: 'poppins',
    //       fontWeight: 700,
    //       letterSpacing: '.3rem',
    //       color: 'inherit',
    //       textDecoration: 'none'
    //     }}
    //   >
    //     Kubby Buddy
    //     <img className='favicon' src={favicon} style={{ height: '50px', width: '50px' }} />
    //   </Typography>
    //   <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //     <Button
    //       sx={{ my: 2, color: 'white', display: 'block' }}
    //       onClick={() => setShowing('Images')}
    //     >
    //       Images
    //     </Button>
    //     <Button
    //       sx={{ my: 2, color: 'white', display: 'block' }}
    //       onClick={() => setShowing('Containers')}
    //     >
    //       Containers
    //     </Button>
    //   </Box>
    //   {/* <ul>
    //     <li>Dashboard</li>
    //     <li onClick={() => setShowing('Images')}>Images</li>
    //     <li onClick={() => setShowing('Containers')}>Containers</li>
    //   </ul> */}
    //   {/* <GlobalCommands /> */}
    //   {/* <Quickview /> */}
    //   </Toolbar>
    // </AppBar>
  );
};
