import React from 'react'
import { Close, Send, Delete} from '@mui/icons-material';
import { Dialog, Box, Typography, InputBase, TextField, Button, Snackbar } from "@mui/material"
import useStore from './store';
import { API_URLS } from '../APIs/API_URLS';
import { useState } from 'react';
import axios from "axios";



export default function ComposeMail() {
    const [input, setinput] = useState("")
    const [subject, setsubject] = useState("")
    const [textfield, settextfield] = useState("")
    
    
    const { setStringValue,ComposeStatus, togglefunction } = useStore();
    
    
    const Savetodraft = async (e) => {
        const payload = {
            to: input,
            from: "samiiwork1@gmail.com",
            subject: subject,
            body: textfield,
            date: new Date(),
            image: "",
            name: "Shahzaib uddin",
            starred: false,
            type: "draft",
            checked: false,
            inbox: false
        }
        e.preventDefault();
        togglefunction("ComposeStatus");
        if(input==="" && subject==="" && textfield===""){
            togglefunction("ErrorbarStatus")
            setStringValue("Email discarded")
        }
        else{
            const res = await axios({
                method: API_URLS.saveDraftEmail.method,
                url: `http://localhost:8000/${API_URLS.saveDraftEmail.endpoint}`,
                data: payload
            })
            togglefunction('refreshscreenstate');
            setStringValue(res.data)
        togglefunction("ErrorbarStatus")
        setinput("")
        settextfield("")
        setsubject("")
    }};
    const Sendemail = async (e) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const payload = {
            to: input,
            from: "samiiwork1@gmail.com",
            subject: subject,
            body: textfield,
            date: new Date(),
            image: "",
            name: "Shahzaib uddin",
            starred: false,
            type: "sent",
            checked: false,
            inbox: false
        }
        e.preventDefault();
        setStringValue("")
        if (payload.subject === "") {
            setsubject("No Subject")
        }
        if (emailRegex.test(payload.to)) {
            if (payload.to === "samiiwork1@gmail.com") {
                payload.inbox = true
            }
            try {
                const res = await axios({
                    method: API_URLS.saveSentEmail.method,
                    url: `http://localhost:8000/${API_URLS.saveSentEmail.endpoint}`,
                    data: payload
                });
                togglefunction('ComposeStatus');
                setStringValue(res.data)
                togglefunction("ErrorbarStatus")
                setinput("")
                settextfield("")
                setsubject("")
            } catch (error) {
                togglefunction("ErrorbarStatus")
                setStringValue(res.data)
            }
            finally {
                togglefunction('refreshscreenstate');

            }
        }
        else {
            setStringValue("Write a correct email address")
            togglefunction("ErrorbarStatus")
        }
    }

    const dialogStyle = {
        height: "80%",
        width: "80%",
        maxWidth: "100%",
        maxHeight: "100%",
        boxShadow: "none",
        overflow: "hidden",
        borderRadius: "10px 10px 0 0"
    }
    
    return (
        <>
            <Dialog PaperProps={{ sx: dialogStyle }} open={ComposeStatus}>
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", backgroundColor: '#f2f6fc', "&>p": { fontWeight: 500, fontSize: 14 } }}>
                    <Typography>
                        New Message
                    </Typography>
                    <Close onClick={(e) => Savetodraft(e)} fontSize='small' />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", padding: "0 10px 0 10px" }}>
                    <InputBase value={input} onChange={(e) => setinput(e.target.value)} name="to" className="ok" sx={{ '@media(max-width:400px)': { fontSize: '12px' }, margin: "10px 0 10px 0", borderBottom: "2px solid #dcdede" }} placeholder='Recipients' />
                    <InputBase value={subject} onChange={(e) => setsubject(e.target.value)} name="subject" sx={{ '@media(max-width:400px)': { fontSize: '12px' }, borderBottom: "1px solid #dcdede" }} placeholder='Subject' />
                </Box>
                <TextField value={textfield} onChange={(e) => settextfield(e.target.value)} name="body" multiline rows={12} sx={{ "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": { '@media(max-width:400px)': { fontSize: '12px' } }, "& .MuiOutlinedInput-notchedOutline": { border: 'none' } }} />
                <Box sx={{ position: 'absolute', width: "99%", bottom: 5, left: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button sx={{ '@media(max-width:400px)': { transform: "scale(0.9)" }, transform: "scale(0.8)" }} variant="contained" onClick={(e) => { Sendemail(e) }} endIcon={<Send />}>
                        Send
                    </Button>
                    <Button sx={{ transform: "scale(0.9)" }} onClick={() => { togglefunction('ComposeStatus') }} variant="outlined" startIcon={<Delete />}>
                        Delete
                    </Button>
                </Box>
            </Dialog >
        </>
    )
}
