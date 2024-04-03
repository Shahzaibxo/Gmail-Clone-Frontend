import { useEffect, useState } from 'react';
import NightsStayTwoToneIcon from '@mui/icons-material/NightsStayTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import * as React from 'react';
import useStore from './store';
import { gmailLogo } from "../assets/Gmail";
import Avatar from '@mui/material/Avatar';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TuneIcon from '@mui/icons-material/Tune';
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
import MoreIcon from '@mui/icons-material/MoreVert';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchDataAPI from '../APIs/DataCallAPI';
import Searchlist from './Searchlist';
import { List } from '@mui/material';

export default function PrimarySearchAppBar() {
    const [Search, setSearch] = useState("")
    const [isFocused, setIsFocused] = useState(false);
    const { togglefunction, themestatus, User } = useStore();
    const { data } = useQuery({
        queryKey: ["searchquery", "all mail", User], queryFn: async () => {
            return await fetchDataAPI("all mail", User);
        }
    })
    const handlechange = (value) => {
        setSearch(value)
    }
    const reasd = data?.filter((email) => {
        return (email.to.toLowerCase().includes(Search) || email.body.toLowerCase().includes(Search) || email.subject.toLowerCase().includes(Search))
    })


    const appnav = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
    function stringAvatar(name) {

        let result;
        const nameParts = name.split(' ');

        if (nameParts.length === 1) {
            result = nameParts[0][0];
        } else {
            result = `${nameParts[0][0]}${nameParts[1][0]}`;
        }
        return {
            sx: {
                bgcolor: stringToColor(name), height: "1.5em", width: "1.5em"
            },
            children: `${result}`,
        };
    }

    const handleBlur = () => {
        setTimeout(() => {
            // setSearchResults([]);
            setIsFocused(false);
          }, 300)
      };
    const ok = () => {
        localStorage.setItem('USERDATA', JSON.stringify({ name: "" }));
        useStore.setState({ User: { name: "" } })
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            {User.name === "" ? <MenuItem sx={{ color: "red" }} onClick={() => { appnav("/registraion/signup") }}>Sign In</MenuItem> :
                <MenuItem sx={{ color: "red" }} onClick={() => { handleMenuClose(); ok() }}>Log Out</MenuItem>}
        </Menu>
    );

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
                <IconButton size="large" color="inherit">
                    <Badge color="error">
                        <HelpOutlineOutlinedIcon color='action' />
                    </Badge>
                </IconButton>
                <p>Help</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <Badge badgeContent={1} color="error">
                        <SettingsOutlinedIcon color='action' />

                    </Badge>
                </IconButton>
                <p>Settings</p>
            </MenuItem>
            <MenuItem onClick={() => { togglefunction("themestatus") }}>
                <IconButton
                    size="large"
                >
                    {themestatus ? <NightsStayTwoToneIcon /> : <LightModeTwoToneIcon color='black' />}
                    <Badge color="error">
                    </Badge>
                </IconButton>
                <p>Switch Themes</p>
            </MenuItem>
            {User.name === "" ? <MenuItem sx={{ color: "red" }} onClick={() => appnav("/registraion/signup")}><IconButton
                size="large"
                color="default"
            >
                <AccountCircle />
            </IconButton>SIGN IN</MenuItem> :
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar  {...stringAvatar(User.name)} />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            }
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={themestatus ? { minHeight: "64px" } : { background: "#f3f3fb", minHeight: "64px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => { togglefunction('SideMenuStatus') }}
                    >
                        <MenuIcon sx={{ color: "black" }} />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'block', marginTop: "9px" } }}>

                        <img src={gmailLogo} style={!themestatus ? null : { filter: "invert(90%)" }} alt="logo here" />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                    {/* "#EAF1FB" */}
                    <Box sx={{ position: "relative", marginTop: "10px", background: "#EAF1FB", width: "100%", maxWidth: "740px", paddingX: "5px", borderRadius: isFocused ? '25px 25px 0 0' : '25px', display: "flex", alignItems: "center", height: "48px", "&>div": { width: "90%" } }}>
                        <SearchIcon sx={{ color: "black" }} />
                        <InputBase value={Search} onFocus={() => setIsFocused(true)}
                            onBlur={handleBlur} onChange={(e) => handlechange(e.target.value)} sx={{ marginLeft: "10px", color: "black" }} placeholder='Search email' />
                        <TuneIcon sx={{ color: "black" }} />
                        {isFocused&& <List sx={{ top: "44px", left: "0px", paddingTop: "0px", paddingX: "0px", position: "absolute", zIndex: 1, width: "100%", height: "180px", overflowY: "auto" }}>


                            {reasd?.map((email) => (
                                <Searchlist key={email._id} email={email} />
                            ))}

                        </List>}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={1} color="error">
                                <SettingsOutlinedIcon color='action' />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge color="error">
                                <HelpOutlineOutlinedIcon color='action' />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            onClick={() => { togglefunction("themestatus") }}
                        >
                            <Badge color="error">
                                {themestatus ? <NightsStayTwoToneIcon /> : <LightModeTwoToneIcon color='black' />}
                            </Badge>
                        </IconButton>
                        {User.name === "" ? <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar />
                        </IconButton> :
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar {...stringAvatar(User.name)} />
                            </IconButton>
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="false"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon color='action' />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}