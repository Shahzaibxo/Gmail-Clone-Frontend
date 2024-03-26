import { Dialog, Box, Typography, InputBase, TextField, Button } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Close, Send, Delete } from '@mui/icons-material';
import { API_URLS } from '../APIs/API_URLS';
import { useState } from 'react';
import useStore from './store';
import axios from "axios";
import React from 'react'
import { useNavigate } from "react-router-dom";



export default function ComposeDraft({ email }) {
    const queryClient = useQueryClient()
    const navigatetodraft = useNavigate();
    const [input, setinput] = useState(email.to)
    const [subject, setsubject] = useState(email.subject)
    const [textfield, settextfield] = useState(email.body)


    const { setStringValue, ErrorbarStatus, ComposeStatus2, togglefunction } = useStore();

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

    const DraftAPI = async () => {
        const res = await axios({
            method: API_URLS.updatedraft.method,
            url: `https://backend-gmail-finalss.vercel.app/API_URLS.updatedraft.endpoint}`,
            data: { id: email._id, input: input, sub: subject, body: textfield }
        })
        setStringValue(res.data)
        togglefunction("ErrorbarStatus")
    }

    const SendAPI = async () => {
        const res = await axios({
            method: API_URLS.sentfromdraft.method,
            url: `https://backend-gmail-finalss.vercel.app/${API_URLS.sentfromdraft.endpoint}`,
            data: {payload:payload, id:email._id}
        });
        setStringValue(res.data)
        togglefunction("ErrorbarStatus")

    }

    const Draftmutation2 = useMutation({
        mutationFn: () => DraftAPI()
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mainquery"] })
            console.log("mutation done");
            togglefunction('ComposeStatus2');
        }
    })

    const drafthandler = async (e) => {
        e.preventDefault();
        if (input === "" && subject === "" && textfield === "") {
            togglefunction("ErrorbarStatus")
            setStringValue("Email discarded")
            togglefunction("ComposeStatus2")
        }
        else {
            Draftmutation2.mutate();
            navigatetodraft(`/emails/draft`)
        }
    }

    const Sendfromdraftmutation = useMutation({
        mutationFn: () => SendAPI()
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mainquery"] })
            togglefunction("ComposeStatus2")
        }
    })

    const Sendemail = async (e) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        e.preventDefault();
        setStringValue("")
        if (payload.subject === "") {
            setsubject("No Subject")
        }
        if (emailRegex.test(payload.to)) {
            if (payload.to === "samiiwork1@gmail.com") {
                payload.inbox = true
            }
            Sendfromdraftmutation.mutate()
            navigatetodraft(`/emails/draft`)

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
                open={ComposeStatus2}>
                <Box
                    sx={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", "&>p": { fontWeight: 500, fontSize: 14 } }}>
                    <Typography>
                        New Message
                    </Typography>
                    <Close
                        onClick={(e) => drafthandler(e)}
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
                        onClick={() => { togglefunction('ComposeStatus2') }}
                        variant="outlined"
                        startIcon={<Delete />}>
                        Delete
                    </Button>
                </Box>
            </Dialog >
        </>
    )
}
