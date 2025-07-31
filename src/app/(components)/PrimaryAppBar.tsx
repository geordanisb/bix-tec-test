'use client';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button,  Drawer,  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import {  ManageAccountsOutlined, MonetizationOn, RestartAlt } from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import PeriodFilter from './cards/PeriodFilter';
import { useAtom } from 'jotai';
import { FiltersInitialState, filtersStore, getTransactions } from '@/appStore';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimaryAppBar() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { data: session } = useSession();
  const [filters,setfilters]=useAtom(filtersStore);
  const [transactions]=useAtom(getTransactions);
  const pendingQty = transactions.filter(t=>t.pending).length;

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { signOut(); handleMenuClose() }}>Sign out</MenuItem>
      <MenuItem onClick={()=>{
        localStorage.setItem('filters',JSON.stringify(filters))
      }}>Save filters preferences</MenuItem>
      <MenuItem onClick={()=>{
        localStorage.setItem('filters','');
      }}>Remove filters preferences</MenuItem>
    </Menu>
  );

  const resetFilters = ()=>{debugger;
    const inLocalStorage = localStorage.getItem('filters');
    const filters = inLocalStorage  ? JSON.parse(inLocalStorage) : FiltersInitialState;
    setfilters(filters);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton onClick={resetFilters} size="large" aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="error"> */}
            <RestartAlt />
          {/* </Badge> */}
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show pending transactions qty"
          color="inherit"
        >
          <Badge badgeContent={pendingQty} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={(e) => {
        // signOut();
        handleProfileMenuOpen(e);
      }}>
        <IconButton sx={{ backgroundColor: 'lightgray', width: 42, height: 45 }}
        // onClick={handleProfileMenuOpen}
        >
          <Avatar src={`https://robohash.org/${session?.user.name}`} alt={session?.user.name!} />
        </IconButton>
      </MenuItem>
      <MenuItem>
      </MenuItem>

    </Menu>
  );

  const [openDrawer, setopenDrawer] = React.useState(false);

  if (!session) return <></>;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setopenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Link href={'/'}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MonetizationOn color='warning' fontSize='large' />
            </IconButton>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <PeriodFilter sx={{color:'white',fontWeight:'bold'}}/>
            
            <IconButton onClick={resetFilters} size="large" aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="error"> */}
                <RestartAlt />
              {/* </Badge> */}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show pending transactions qty"
              color="inherit"
            >
              <Badge badgeContent={pendingQty} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ backgroundColor: 'lightgray', width: 42, height: 45 }}
              onClick={handleProfileMenuOpen}
            >
              <Avatar src={`https://robohash.org/${session?.user.name}`} alt={session?.user.name!} />
            </IconButton>

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav>
        <Drawer
          open={openDrawer}
          onClose={() => setopenDrawer(false)}

        >
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setopenDrawer(false)}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <Link href={`/user`}>
                    <Stack direction={'row'}>
                      <ListItemIcon>
                        <ManageAccountsOutlined />
                      </ListItemIcon>
                      <ListItemText primary={'Users'} />
                    </Stack>
                  </Link>
                </ListItemButton>
              </ListItem>
            </List>
            {/* <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <Inbox /> : <Mail />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> */}
          </Box>
        </Drawer>
      </nav>
    </Box>
  );
}
