import React from 'react'
import { useParams } from "react-router-dom"
import { API_URLS } from '../APIs/API_URLS';
import useAPI from '../Middleware/UseAPI';
import { useEffect, useState} from 'react';
import { Box, Checkbox, List } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email.jsx';
import useStore from './store.js';

export default function Emails() {
const { param } = useParams();
const {MainCheckboxStatus, togglefunction, falsemark, refreshscreenstate}=useStore()
const [arryofselectedemails, setarryofselectedemails] = useState([])

const movetobinservice = useAPI(API_URLS.movetobin)
const getemailservice = useAPI(API_URLS.getEmailfromparam)


useEffect(() => {
  getemailservice.call({}, param);
  falsemark('MainCheckboxStatus')
  setarryofselectedemails([])
}, [param,refreshscreenstate])

const selectemailfunction =(e)=>{
  togglefunction('MainCheckboxStatus')
  if (e.target.checked){
    const emailarry= getemailservice?.response?.map(email=>email._id);
    setarryofselectedemails(emailarry);
  }
  else{
    setarryofselectedemails([])
  }
}
const movetobinhandler=()=>{
  movetobinservice.call(arryofselectedemails)
  togglefunction('refreshscreenstate')
}

return (
  <>
    <Box sx={{overflowY:"auto", height:"90vh"}}>
    <Box sx={{padding:"10px, 10px, 0, 10px", display:"flex", alignItems:"center"}}>
      <Checkbox checked={MainCheckboxStatus} onClick={(e)=>selectemailfunction(e)} size="small" />
      <DeleteOutline onClick={movetobinhandler}/>
    </Box>
    <List>
        {getemailservice.response?getemailservice.response.map(email=>(
          <Email key={email._id} email={email} seletedemails={arryofselectedemails}/>
          )):null}
    </List>
    </Box>
    </>
  )
}