import React from 'react'
import { ArrowBack, Delete, LocalPrintshopOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Chip} from "@nextui-org/react";


export default function ViewEmail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (state === undefined || state === null) {
      navigate("/emails/inbox")
    }
  }, [])

  const { email } = state;
  console.log(email)
  return (
    <>
      <Box sx={{ width: "76vw" }}>
        <Box sx={{ marginBottom: "20px" }}>
          <IconButton onClick={() => { window.history.back() }}>
            <ArrowBack fontSize='small' />
          </IconButton>
          <IconButton>
            <Delete fontSize='small' />
          </IconButton>
        </Box>
        <Box sx={{ wordBreak: "break-word", height: "auto", fontSize: { lg: "24px", xs: "14px" }, display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div style={{ marginRight: "5px" }}>

            {email.subject}
          </div>

          <Chip color="warning" variant="dot">{email.type}</Chip>

          <IconButton sx={{ marginLeft: "auto" }}>

            <LocalPrintshopOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
