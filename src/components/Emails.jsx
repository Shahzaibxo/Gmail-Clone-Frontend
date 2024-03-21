import axios from "axios";
import { Checkbox } from "@nextui-org/react";
import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { API_URLS } from '../APIs/API_URLS';
import useAPI from '../Middleware/UseAPI';
import { useEffect, useState } from 'react';
import { Box, IconButton, List, Snackbar } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email.jsx';
import useStore from './store.js';

export default function Emails() {
  const [arryofselectedemails, setarryofselectedemails] = useState([])
  const [checkboxstatus, setcheckboxstatus] = useState(false)
  const [response, setresponse] = useState([])
  const { togglefunction, refreshscreenstate, ErrorbarStatus, error, setStringValue } = useStore()
  // Preventing opening of unlisted routes
  const { param } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const arrayOfRoutes = ["inbox", "starred", "sent", "draft", "bin", "all mail"];
    if (!arrayOfRoutes.includes(param)) {
      navigate("/emails/inbox")
    };
  }, [])



  useEffect(() => {
    const fetch = async () => {
      const res = await axios({
        method: API_URLS.getEmailfromparam.method,
        url: `http://localhost:8000/${API_URLS.getEmailfromparam.endpoint}/${param}`,
      });
      setresponse(res.data)
      setarryofselectedemails([])
    }
    fetch()
  }, [param, refreshscreenstate])

  const selectemailfunction = async (e) => {
    setcheckboxstatus(!checkboxstatus)

    if (checkboxstatus === false) {
      const emailarry = response.map(email => email._id);
      setarryofselectedemails(emailarry);
      console.log(emailarry, "inside if")
    }
    else {
      setarryofselectedemails([])
      console.log(arryofselectedemails, "inside else")
    }
  }

  const movetobinhandler = async () => {
    if (arryofselectedemails.length === 0) {
      setStringValue("Select emails first")
      togglefunction("ErrorbarStatus")
      setcheckboxstatus(false)

    }
    else {
      try{

        const res2 = await axios({
          method: API_URLS.movetobin.method,
          url: `http://localhost:8000/${API_URLS.movetobin.endpoint}/${param}`,
          data: arryofselectedemails
        });
        setStringValue(res2.data)
        togglefunction("ErrorbarStatus")
      }
      finally{
        togglefunction('refreshscreenstate')
        setcheckboxstatus(false)  
      }
    }
  }

  console.log(arryofselectedemails, "outside condition ")

  return (
    <>
      <Box sx={{ overflowY: "auto", height: "90vh" }}>
        <Box sx={{ padding: "10px, 10px, 0, 10px", display: "flex", alignItems: "center" }}>
          <Checkbox isSelected={checkboxstatus} onChange={(e) => selectemailfunction(e)} />
          {/* <Checkbox checked={MainCheckboxStatus} onClick={(e)=>selectemailfunction(e)} fontSize="small" /> */}
          <IconButton onClick={movetobinhandler}>
            <DeleteOutline fontSize='small' />
          </IconButton>
        </Box>
        <List sx={{ backgroundColor: "#def0fa", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: "0px" }}>
          {response.map(email => (
            <Email key={email._id} email={email} seletedemails={arryofselectedemails} />
          ))}
        </List>
        <Snackbar sx={{ width: "40vw", ".css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": { fontSize: "10px" } }} open={ErrorbarStatus} autoHideDuration={3000} onClose={() => togglefunction("ErrorbarStatus")} message={error} />
      </Box>
    </>
  )
} 