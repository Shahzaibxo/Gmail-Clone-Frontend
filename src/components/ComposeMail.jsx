import { Dialog, Box, Typography, InputBase, TextField, Button } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Close, Send, Delete } from '@mui/icons-material';
import { API_URLS } from '../APIs/API_URLS';
import { useState } from 'react';
import useStore from './store';
import axios from "axios";
import React from 'react'
import { useParams } from "react-router-dom";



export default function ComposeMail() {
    const queryClient = useQueryClient();
    const [input, setinput] = useState("");
    const [subject, setsubject] = useState("");
    const [textfield, settextfield] = useState("");


    const { setStringValue, ComposeStatus, togglefunction } = useStore();
    
    
    let payload = {
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
    let Dpayload = {
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

    const DraftAPI = async () => {
        const res = await axios({
            method: API_URLS.saveDraftEmail.method,
            url: `https://backend-gmail-finalss.vercel.app/${API_URLS.saveDraftEmail.endpoint}`,
            data: Dpayload
        })
        setStringValue(res.data)
        togglefunction("ErrorbarStatus")
        setinput("")
        settextfield("")
        setsubject("")
    }
    
    const SendAPI = async () => {
        if (input === "shahzuwork@gmail.com") {
            payload.inbox=true
            console.log("triggere")
        }
        try {
            console.log(input, "this is it")
            const res = await axios({
                method: API_URLS.saveSentEmail.method,
                url: `https://backend-gmail-finalss.vercel.app/${API_URLS.saveSentEmail.endpoint}`,
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
            setStringValue(error)
        }
    }
    console.log(input,'not it')
    
    const Draftmutation = useMutation({
        mutationFn: () => DraftAPI()
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mainquery"] })
        }
    })
    const Sendmutation = useMutation({
        mutationFn: () => SendAPI()
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mainquery"] })
        }
    })

    const Savetodraft = async (e) => {
        e.preventDefault();
        togglefunction("ComposeStatus");
        if (input === "" && subject === "" && textfield === "") {
            togglefunction("ErrorbarStatus")
            setStringValue("Email discarded")
        }
        else {
            Draftmutation.mutate()
        }
    };

    const Sendemail = async (e) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        e.preventDefault();
        setStringValue("")
        if (payload.subject === "") {
            setsubject("No Subject")
        }
        if (emailRegex.test(payload.to)) {
        const username = input.split("@")[0];
        payload.name= username
            Sendmutation.mutate()
        }
        else {
            setStringValue("Write a correct email address")
            togglefunction("ErrorbarStatus")
        }
    }


    return (
        <>
            <Dialog
                PaperProps={{ sx: { height: "80%", width: "80%", maxWidth: "100%", maxHeight: "100%", boxShadow: "none", overflow: "hidden", borderRadius: "10px 10px 0 0" } }}
                open={ComposeStatus}>
                <Box
                    sx={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", "&>p": { fontWeight: 500, fontSize: 14 } }}>
                    <Typography>
                        New Message
                    </Typography>
                    <Close
                        onClick={(e) => Savetodraft(e)}
                        fontSize='small' />
                </Box>
                <Box
                    sx={{ display: "flex", flexDirection: "column", padding: "0 10px 0 10px" }}>
                    <InputBase
                        value={input}
                        onChange={(e) => setinput(e.target.value)}
                        name="to"
                        sx={{ '@media(max-width:400px)': { fontSize: '12px' }, margin: "10px 0 10px 0", borderBottom: "2px solid #dcdede" }} placeholder='Recipients' />
                    <InputBase value={subject} onChange={(e) => setsubject(e.target.value)} name="subject" sx={{ '@media(max-width:400px)': { fontSize: '12px' }, borderBottom: "1px solid #dcdede" }}
                        placeholder='Subject' />
                </Box>
                <TextField
                value={textfield}
                    onChange={(e) => settextfield(e.target.value)}
                    name="body"
                    multiline
                    rows={12}
                    sx={{ "& .css-1a2xmvf-MuiInputBase-root-MuiOutlinedInput-root": { fontSize: "0.8rem" }, "& .MuiOutlinedInput-notchedOutline": { border: 'none' } }} />
                <Box
                    sx={{ position: 'absolute', width: "99%", bottom: 5, left: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                        sx={{ '@media(max-width:400px)': { transform: "scale(0.9)" }, transform: "scale(0.8)" }}
                        variant="contained"
                        onClick={(e) => { Sendemail(e) }}
                        endIcon={<Send />}>
                        Send
                    </Button>
                    <Button
                        sx={{ transform: "scale(0.9)" }}
                        onClick={() => { togglefunction('ComposeStatus') }}
                        variant="outlined"
                        startIcon={<Delete />}>
                        Delete
                    </Button>
                </Box>
            </Dialog >
        </>
    )
}
