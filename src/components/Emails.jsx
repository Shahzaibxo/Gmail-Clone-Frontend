import Fab from '@mui/material/Fab';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import { Box, IconButton, List } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useParams, useNavigate } from "react-router-dom"
import emptyimg from "../assets/empty.jpeg"
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useRef } from 'react';
import { DeleteOutline, Add } from '@mui/icons-material';
import fetchDataAPI from "../APIs/DataCallAPI.js"
import { Checkbox } from "@nextui-org/react";
import { API_URLS } from '../APIs/API_URLS';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Email from './Email.jsx';
import useStore from './store.js';
import axios from "axios";
import React from 'react'



export default function Emails() {
  const queryClient = useQueryClient()

  const CheckboxRef = useRef(false)

  const { togglefunction,User, selectedarray, clearSelectedArray, appendToStringArray, refreshscreenstate, setStringValue } = useStore()

  const navigate = useNavigate();
  const { param } = useParams();
  const [value, setValue] = React.useState('one');

  useEffect(() => {
    const arrayOfRoutes = ["inbox", "starred", "sent", "draft", "bin", "all mail"];
    if (!arrayOfRoutes.includes(param)) {
      navigate("/emails/inbox")
    }
    clearSelectedArray()
    CheckboxRef.current = false
  }, [param, refreshscreenstate])

  const TabHandler = (newValue) => {
    setValue(newValue);
  };

  const { data, status } = useQuery({
    queryKey: ["mainquery", param, User], queryFn: async () => {
      return await fetchDataAPI(param, User);
    }
  })
  const selectemailfunction = () => {
    CheckboxRef.current = !CheckboxRef.current
    if (CheckboxRef.current === true) {
      data?.map(email => appendToStringArray(email._id))
    }
    else {
      clearSelectedArray()
    }
  }

  const DeleteAPi = async () => {
    const res2 = await axios({
      method: API_URLS.movetobin.method,
      url: `https://backend-gmail-finalss.vercel.app/{API_URLS.movetobin.endpoint}/${param}`,
      data: selectedarray,
      headers:{
        "Authorization":`Bearer ${User.token}`
      }
    });
    setStringValue(res2.data)
    togglefunction("ErrorbarStatus")
  }

  const DeleteMutation = useMutation({
    mutationFn: () => DeleteAPi()
    ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainquery"] })
      queryClient.invalidateQueeries({ queryKey: ["searchquery"] })
    }
  })

  const movetobinhandler = async () => {
    if (selectedarray?.length === 0) {
      setStringValue("Select emails first")
      togglefunction("ErrorbarStatus")
      CheckboxRef.current = false
    }
    else {
      try {
        DeleteMutation.mutate();
      }
      finally {
        CheckboxRef.current = false
      }
    }
  }


  return (
    <>
      <Box sx={{ overflowY: "auto", height: "90vh" }}>
        <Box sx={{ padding: "10px, 10px, 0, 10px", marginTop: "10px", display: "flex", alignItems: "center" }}>
          <Checkbox className="ml-1" isSelected={CheckboxRef.current} size="md" radius="lg" onChange={(e) => selectemailfunction(e)} />
          {CheckboxRef.current ? <IconButton onClick={() => movetobinhandler()}>
            <DeleteOutline fontSize='small' sx={{ color: "black" }} />
          </IconButton> : null
          }
          <IconButton onClick={() => togglefunction("refreshscreenstate")}>
            <RefreshIcon fontSize='small' sx={{ color: "black" }} />
          </IconButton>

        </Box>
        {param === "inbox" ?
          <Tabs
            sx={{ "& .css-1mi9655-MuiButtonBase-root-MuiTab-root": { minHeight: "56px", minWidth: "123px" }, "& .css-1ih4l6m-MuiButtonBase-root-MuiTab-root": { minHeight: "56px", minWidth: "123px" } }}
            value={value}
            aria-label="wrapped label tabs example"
          >
            <Tab sx={{ width: "20px", fontSize: "12px" }} onClick={() => TabHandler("one")} value="one" label="Primary" icon={<InboxRoundedIcon fontSize='small' />} iconPosition='start' />
            <Tab value="two" sx={{ width: "20px", fontSize: "12px" }} onClick={() => TabHandler("")} label="Socials" icon={<PeopleAltIcon fontSize='small' />} iconPosition='start' >

            </Tab>
          </Tabs> : null}

        {value === "one" ?
          status === "success" && data?.length === 0 ?
            <Box sx={{ fontSize: { xs: "13px" }, marginTop: "30px", height: "100vh", textAlign: "center" }}>
              <img src={emptyimg} style={{ height: "200px", margin: "0 auto" }} alt="" />
              No Emails Found on {param} tab...<br />
              {param === "inbox"? <p>Send an Email to {User.email} to display emails here...</p> : param === "starred" ? <p>Star mark an Email to display it here..</p> : param === "sent" ? <p>Send an Email to Display them here</p> : param === "draft" ? <p>Close an Email you're about to compose to save it in drafts...</p> : param === "bin" ? <p>Delete any Email to display it here...</p> : null}
            </Box>

            :
            <List >
              {data?.map(email => (
                <Email key={email._id} email={email} />
              ))}
            </List> : null}
        <Fab onClick={() => togglefunction("ComposeStatus")} sx={{ position: "absolute", zIndex: "1", bottom: "40px", right: "30px" }} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Box>
    </>
  )
} 