import React from 'react'
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { List, ListItem } from '@mui/material';
import {Sidebad_elements} from "./Sidebarlist"
import ComposeMail from './ComposeMail';
import useStore from './store';
import { NavLink, useParams } from 'react-router-dom'


export default function SidebarContent() {
  const { param } = useParams()
  const { togglefunction , themestatus} = useStore();    
  return (
    <div style={{padding:16}}>
      <Button onClick={()=>togglefunction('ComposeStatus')} sx={{backgroundColor:"none",background:"#c2e7ff",color:"#001d35", padding:"16px", borderRadius:"16px", minWidth:"100px", textTransform:"none"}}><CreateOutlinedIcon/>Compose</Button>
      <List >
        {
          Sidebad_elements.map(element=>(
            <NavLink key={element.name}  to={element.name==="compose"?null:`/emails/${element.name}`}>
            <ListItem key={element.name} sx={{
              padding: '10px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer', 
              backgroundColor: param === element.name ? "#d3e3fd" : null,
              color:param===element.name?"black":null,
              borderRadius: param === element.name ? "0 16px 16px 0" : null, 
              display: 'block', 
              marginLeft: "5px"}}>
              <element.icon sx={{marginRight:2, height:"25px", width:"20px"}}/>{element.title}
            </ListItem>
            </NavLink>
          ))
        }
      </List>
        <ComposeMail/>
    </div>
  )
}
