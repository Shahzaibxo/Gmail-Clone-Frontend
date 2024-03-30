import React from 'react'
import Drawer from '@mui/material/Drawer';
import SidebarContent from './SidebarContent';
import useStore from './store';
import { gmailLogo } from "../assets/Gmail";
import { grey } from '@mui/material/colors'


export default function Sidebar() {
  const { SideMenuStatus, togglefunction, themestatus } = useStore();

  return (
    <div onClick={()=>{togglefunction("SideMenuStatus")}}>
      <Drawer anchor='left' open={SideMenuStatus} variant="temporary" sx={{'& .MuiDrawer-paper': { width:"20%", minWidth:"180px",position:"relative" ,borderRight: 'none',background:themestatus?grey[800]:null,height:'calc(100vh)'},}}>
      
      <img src={gmailLogo} style={!themestatus ? {margin:"20px auto", width:"130px", height:"50px"} : { margin:"20px auto",filter: "invert(90%)", width:"130px", height:"50px" }} alt="logo here" />
        <SidebarContent/>
      <p style={{left:"15px",bottom:"10px" ,position:"absolute"}}>Made With 💖 & 💪</p>
       </Drawer>
    </div>
    
  )
}
