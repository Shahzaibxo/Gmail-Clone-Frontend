import React from 'react'
import Drawer from '@mui/material/Drawer';
import SidebarContent from './SidebarContent';
import useStore from './store';

export default function Sidebar() {
  const { SideMenuStatus, togglefunction } = useStore();

  return (
      <Drawer anchor='left' open={SideMenuStatus} hideBackdrop={true} ModalProps={{keepMounted: true}} variant="persistent" sx={{'& .MuiDrawer-paper': { width:"25%", minWidth:"200px", borderRight: 'none',background: '#f5F5F5',marginTop:'60px',height: 'calc(100vh - 64px)'},}}>
        <SidebarContent/>
       </Drawer>
    
  )
}
