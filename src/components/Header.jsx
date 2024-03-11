import React from 'react'
import { AppBar, Toolbar, InputBase, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {gmailLogo} from "../assets/Gmail";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useStore from './store';

export default function Header() {
    const { toggleMenustatus } = useStore();
    return (
        <AppBar sx={{background: "#F5F5F5", boxShadow:"none"}} position='static'>
            <Toolbar>
                <MenuIcon color='action' onClick={toggleMenustatus} />
                    <img src={gmailLogo} alt="logo here" style={{marginLeft:15}} />
                    <Box sx={{background:"#EAF1FB", paddingX:"5px", marginLeft:"80px", borderRadius:"8px", minWidth:"690px", maxWidth:"720px", display:"flex", alignItems:"center", height:"48px", justifyContent:"space-between","&>div":{width:"90%"}}}>
                        <SearchIcon color='action'/>
                        <InputBase color='action'/>
                        <TuneIcon color='action'/>
                    </Box>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"end", gap:2}}>
                        <HelpOutlineOutlinedIcon color='action'/>
                        <SettingsOutlinedIcon  color='action'/>
                    </Box>
            </Toolbar>
        </AppBar>
    )
}
