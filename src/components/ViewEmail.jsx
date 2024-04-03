import { Fab } from '@mui/material';
import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Button } from "@nextui-org/react";
import { ArrowBack, DeleteOutline, LocalPrintshopOutlined, Reply, Edit } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chip } from "@nextui-org/react";
import ComposeDraft from './ComposeDraft';
import useStore from './store';
import { API_URLS } from '../APIs/API_URLS';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ViewEmail() {
  const { state } = useLocation();
  const queryClient = useQueryClient()
  const {param}= useParams();
  const navigate = useNavigate();
  const navigateback=useNavigate()

  const { togglefunction,setStringValue } = useStore()
  
  const DeleteAPi = async () => {
    const res2 = await axios({
      method: API_URLS.movetobin.method,
      url: `https://backend-gmail-finalss.vercel.app/${API_URLS.movetobin.endpoint}/${param}`,
      data: [state._id]
    });
    setStringValue(res2.data)
    togglefunction("ErrorbarStatus")
  
  }

  
  const DeleteMutation2 = useMutation({
    mutationFn: () => DeleteAPi()
    ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainquery"] })
    }
  })

  const deletehandler=()=>{
    DeleteMutation2.mutate();
    navigateback(`/emails/${param}`)
  }

  if (state === undefined || state === null) {
    navigate("/emails/inbox")
  }

  return (
    <>
      <Box
        sx={{ width: "97%", display: "flex",height:"100vh" ,flexDirection: "column" }}>
        <Box
          sx={{ marginBottom: "20px", marginTop: "10px" }}>
          <IconButton
            onClick={() => { window.history.back() }}>
            <ArrowBack
              fontSize='small'
              sx={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <DeleteOutline
              fontSize='small'
              sx={{ color: "black" }} 
              onClick={()=>{deletehandler()}}
              />
          </IconButton>
        </Box>
        <Box
          sx={{ wordBreak: "break-word", height: "auto", fontSize: { lg: "24px", xs: "18px" }, display: "flex", flexDirection: "row", alignItems: "center", marginLeft: { lg: "60px", md: "35px", xs: "15px" } }}>
          <div
            style={{ marginRieght: "5px" }}>

            {state?.subject}
          </div>

          <Chip
            color="default"
            size='sm'
            radius="sm"
            className='ml-2'
            onClose={() => { }} >
            {state?.type}
          </Chip>

          <IconButton
            sx={{ marginLeft: "auto" }}>

            <LocalPrintshopOutlined
              fontSize="small"
              sx={{ color: "black" }} />
          </IconButton>
        </Box>
        <Box
          sx={{ width: "100%", marginLeft: { lg: "30px", md: "15px", xs: "5px" }, marginTop: "20px", height: { xs: "8vh", lg: "10vh" }, display: "flex", flexDirection: "row" }}>
          <Avatar
            sx={{ marginTop: "5px", width: 44, height: 44 }}
            src='https://images.unsplash.com/broken' />
          <Typography
            sx={{ marginLeft: "10px", fontSize: "13px", marginTop: "10px", fontWeight: 520 }}>
            {state?.name}
          </Typography>
          <Typography
            sx={{ fontSize: "11px", marginTop: "12px", marginLeft:"4px",fontWeight: 300 }}>
            to:&nbsp;&nbsp;&#60;{state?.to}&#62;
          </Typography>
        </Box>

        <Box
          sx={{ margin: "10px auto", width: "92%", MaxHeight: "80vh", height: "auto", fontSize: { lg: "14.5px", xs: "12px" } }}>
          <pre
            style={{ whiteSpace: 'pre-wrap', fontFamily: "Arial", lineHeight: "1.5rem" }} >
            {state?.body}
          </pre>
        </Box>
        <Box
          sx={{ marginLeft: { lg: "30px", md: "15px", xs: "5px" } }}>
          <hr style={{ height: "4cpx" }} />
          {state.type === "draft" ?
          <IconButton>

            <Button
              className='w-18 h-8 text-blue mt-2'
              radius='full'
              variant='ghost'
              startContent={<Edit />}
              onClick={() => { togglefunction("ComposeStatus2") }}
              >
              Edit
            </Button> 
              </IconButton>:
            <Button
              className='w-18 h-8 text-blue mt-5'
              radius='full'
              variant='ghost'
              startContent={<Reply />}>
              Reply
            </Button>
          }
        
        </Box>
        <ComposeDraft email={state} />
      </Box>
    </>
  )
}
