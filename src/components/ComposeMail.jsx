import React from 'react'
import { Close, DeleteOutline, Subject } from '@mui/icons-material';
import { Dialog, Box, Typography, InputBase, TextField, Button, Snackbar } from "@mui/material"
import useStore from './store';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URLS } from '../APIs/API_URLS';
import APIcall from '../Middleware/UseAPI';
import { useState } from 'react';
export default function ComposeMail() {

    // Api calls
    const sendEmailtoDBservice = APIcall(API_URLS.saveSentEmail)
    const sendDrafttoDBservice = APIcall(API_URLS.saveDraftEmail)
    // States for error component 
    const [error, seterror] = useState("")

    const { setpayloadData, ErrorbarStatus, payload, ComposeStatus, togglefunction } = useStore();

    const Savetodraft = (e) => {
        e.preventDefault();
        togglefunction("ComposeStatus");
        payload.type = "draft"
        sendDrafttoDBservice.call(payload);
        togglefunction('refreshscreenstate');

    };

    const Sendemail = (e) => {
        e.preventDefault();
        seterror("")
        if (payload.subject === "") {
            payload.subject = "No Subject"
        }
        if (payload.to) {
            if (payload.to === "samiiwork1@gmail.com") {
            payload.inbox = true
            }
            togglefunction('ComposeStatus');
            payload.type = "sent"
            sendEmailtoDBservice.call(payload);
            togglefunction('refreshscreenstate');
        }
        else {
            seterror("Write a correct email address")
            togglefunction("ErrorbarStatus")
        }
    }
       

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpayloadData({ [name]: value });
};

const dialogStyle = {
    height: "80%",
    width: "80%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "10px 10px 0 0"
}
const handleClose = (event, reason) => {

    togglefunction("ErrorbarStatus")
};

return (
    <>
        <Dialog PaperProps={{ sx: dialogStyle }} open={ComposeStatus}>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", backgroundColor: '#f2f6fc', "&>p": { fontWeight: 500, fontSize: 14 } }}>
                <Typography>
                    New Message
                </Typography>
                <Close onClick={(e)=>Savetodraft(e)} fontSize='small' />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "0 10px 0 10px" }}>
                <InputBase value={payload.to} onChange={handleInputChange} name="to" className="ok" sx={{ '@media(max-width:400px)': { fontSize: '12px' }, margin: "10px 0 10px 0", borderBottom: "2px solid #dcdede" }} placeholder='Recipients' />
                <InputBase value={payload.subject} onChange={handleInputChange} name="subject" sx={{ '@media(max-width:400px)': { fontSize: '12px' }, borderBottom: "1px solid #dcdede" }} placeholder='Subject' />
            </Box>
            <TextField value={payload.body} onChange={handleInputChange} name="body" multiline rows={12} sx={{ "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": { '@media(max-width:400px)': { fontSize: '12px' } }, "& .MuiOutlinedInput-notchedOutline": { border: 'none' } }} />
            <Box sx={{ position: 'absolute', width: "99%", bottom: 5, left: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button sx={{ '@media(max-width:400px)': { transform: "scale(0.9)" }, transform: "scale(0.8)" }} variant="contained" onClick={(e)=>{Sendemail(e)}} endIcon={<SendIcon />}>
                    Send
                </Button>
                <Button sx={{ transform: "scale(0.9)" }} onClick={() => { togglefunction('ComposeStatus') }} variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Box>
        </Dialog >
        <Snackbar sx={{ width: "40vw", ".css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": { fontSize: "10px" } }} open={ErrorbarStatus} autoHideDuration={3000} onClose={handleClose} message={error} />

    </>
)
}
