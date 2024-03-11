import React from 'react'
import Button from '@mui/material/Button';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { List, ListItem } from '@mui/material';
import {Sidebad_elements} from "./Sidebarlist"
import ComposeMail from './ComposeMail';
import useStore from './store';

export default function SidebarContent() {
  const { toggleComposestatus } = useStore();    
  return (
    <div style={{padding:16}}>
      <Button onClick={toggleComposestatus} sx={{backgroundColor:"none",background:"#c2e7ff",color:"#001d35", padding:"16px", borderRadius:"16px", minWidth:"140px", textTransform:"none"}}><CreateOutlinedIcon/>Compose</Button>
      <List>
        {
          Sidebad_elements.map(element=>(
            <ListItem key={element.name} sx={{
              padding: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'}}>
              <element.icon fontSize='small' sx={{marginRight:2}}/>{element.title}
            </ListItem>
          ))
        }
      </List>
        <ComposeMail/>
    </div>
  )
}
