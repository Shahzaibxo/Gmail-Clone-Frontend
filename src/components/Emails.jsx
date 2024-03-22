import axios from "axios";
import { Checkbox } from "@nextui-org/react";
import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { API_URLS } from '../APIs/API_URLS';
import { useEffect, useState, useRef } from 'react';
import { Box, IconButton, List, Snackbar } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email.jsx';
import useStore from './store.js';

export default function Emails() {
  const Ref = useRef(false) 
  const [response, setresponse] = useState([])
  const { togglefunction, selectedarray,falsemark ,clearSelectedArray, appendToStringArray, refreshscreenstate, ErrorbarStatus, error, setStringValue } = useStore()
  // Preventing opening of unlisted routes
  const { param } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const arrayOfRoutes = ["inbox", "starred", "sent", "draft", "bin", "all mail"];
    if (!arrayOfRoutes.includes(param)) {
      navigate("/emails/inbox")
    }
  }, [])


  useEffect(() => {
    const fetch = async () => {
      const res = await axios({
        method: API_URLS.getEmailfromparam.method,
        url: `http://localhost:8000/${API_URLS.getEmailfromparam.endpoint}/${param}`,
      });
      setresponse(res.data)
      clearSelectedArray()
      Ref.current = false

    }
    fetch()
  }, [param, refreshscreenstate])

  const selectemailfunction = (e) => {
    Ref.current = !Ref.current
    
    if (Ref.current === true) {
      response?.map(email => appendToStringArray(email._id))
    }
    else {
      clearSelectedArray()
    }
  }

  const movetobinhandler = async () => {
    if (selectedarray.length === 0) {
      setStringValue("Select emails first")
      togglefunction("ErrorbarStatus")
      Ref.current=false
    }
    else {
      try {

        const res2 = await axios({
          method: API_URLS.movetobin.method,
          url: `http://localhost:8000/${API_URLS.movetobin.endpoint}/${param}`,
          data: selectedarray
        });
        setStringValue(res2.data)
        togglefunction("ErrorbarStatus")
      }
      finally {
        Ref.current=false  
        togglefunction('refreshscreenstate')
    }
    }
  }


  return (
    <>
      <Box sx={{ overflowY: "auto", height: "90vh" }}>
        <Box sx={{ padding: "10px, 10px, 0, 10px", display: "flex", alignItems: "center" }}>
          <Checkbox className="ml-1" isSelected={Ref.current} size="md" radius="lg" onChange={(e) => selectemailfunction(e)} />
          {/* <Checkbox checked={MainCheckboxStatus} onClick={(e)=>selectemailfunction(e)} fontSize="small" /> */}
          <IconButton onClick={movetobinhandler}>
            <DeleteOutline fontSize='small' />
          </IconButton>
        </Box>
        <List sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 0 }}>
          {response.map(email => (
            <Email checkboxstatus={Ref.current} selectedarray={selectedarray} key={email._id} email={email} />
          ))}
        </List>
        <Snackbar sx={{ width: "40vw", ".css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": { fontSize: "10px" } }} open={ErrorbarStatus} autoHideDuration={3000} onClose={() => togglefunction("ErrorbarStatus")} message={error} />
      </Box>
    </>
  )
} 