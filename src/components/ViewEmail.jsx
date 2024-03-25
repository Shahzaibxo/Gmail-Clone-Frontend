import React from 'react'
import Avatar from '@mui/material/Avatar';
import {Button} from "@nextui-org/react";
import { ArrowBack, DeleteOutline, LocalPrintshopOutlined, Reply } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Chip } from "@nextui-org/react";


export default function ViewEmail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (state === undefined || state === null) {
      navigate("/emails/inbox")
    }
  }, [])
  console.log(state?.body)
 console.log(state)
  return (
    <>
      <Box sx={{ width: "97%", display:"flex", flexDirection:"column" }}>
        <Box sx={{ marginBottom: "20px", marginTop:"10px" }}>
          <IconButton onClick={() => { window.history.back() }}>
            <ArrowBack fontSize='small' sx={{color:"black"}} />
          </IconButton>
          <IconButton>
            <DeleteOutline fontSize='small' sx={{color:"black"}} />
          </IconButton>
        </Box>
        <Box sx={{ wordBreak: "break-word", height: "auto",fontSize: { lg: "24px", xs: "18px" } , display: "flex", flexDirection: "row", alignItems: "center", marginLeft:{lg:"60px", md:"35px", xs:"15px"} }}>
          <div style={{ marginRight: "5px" }}>

            {state?.subject}
          </div>

          <Chip color="default" size='sm' radius="sm" className='ml-2'  onClose={()=>{}} >{state?.type}</Chip>

          <IconButton sx={{ marginLeft: "auto" }}>

            <LocalPrintshopOutlined fontSize="small" sx={{color:"black"}}/>
          </IconButton>
        </Box>
        <Box sx={{width:"100%",marginLeft:{lg:"30px", md:"15px", xs:"5px"} ,marginTop:"20px" ,height:{xs:"8vh", lg:"10vh"}, display:"flex", flexDirection:"row"}}>
        <Avatar sx={{marginTop:"5px" ,width:44, height:44}} src='https://avatars.githubusercontent.com/u/145616378?s=400&u=4b2b22764aec2af4e0179f63b51508a56a40440a&v=4'/>
        <Typography sx={{ marginLeft:"10px", fontSize:"13px", marginTop:"10px", fontWeight:520}}>{state?.name}</Typography>
        <Typography sx={{fontSize:"11px",marginTop:"12px",fontWeight:300}}>
        &nbsp;&nbsp;&#60;{state?.to}&#62;
        </Typography>
        </Box>
        
        <Box sx={{margin:"10px auto",width:"92%",MaxHeight:"80vh", height:"auto", fontSize: { lg: "14.5px", xs: "12px" }}}>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily:"Arial", lineHeight:"1.5rem" }} >

        {state?.body}
        </pre>
        </Box>
        <Box sx={{marginLeft:{lg:"30px", md:"15px", xs:"5px"}}}> 

        <Button className='w-18 h-8 text-blue' radius='full' variant='ghost' startContent={<Reply/>}>Reply</Button>
        </Box>
      </Box>
    </>
  )
}
