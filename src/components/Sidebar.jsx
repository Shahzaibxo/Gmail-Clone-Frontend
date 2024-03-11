import React from 'react'
import Drawer from '@mui/material/Drawer';
import SidebarContent from './SidebarContent';
import useStore from './store';

export default function Sidebar() {
  const { MenuStatus } = useStore();

  return (
      <Drawer anchor='left' open={MenuStatus} hideBackdrop={true} ModalProps={{keepMounted: true}} variant="persistent" sx={{'& .MuiDrawer-paper': { width: 250,borderRight: 'none',background: '#f5F5F5',marginTop:'64px',height: 'calc(100vh - 64px)'},}}>
        <SidebarContent/>
       </Drawer>
    
  )
}
