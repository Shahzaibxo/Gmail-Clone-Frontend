import React from 'react'
import { Close, DeleteOutline } from '@mui/icons-material';
import { Dialog, Box, Typography, InputBase, TextField, Button } from "@mui/material"
import useStore from './store';
import useApi from "../Middleware/UseAPI"
import { API_URLS } from '../APIs/API_URLS';

export default function ComposeMail() {
    const sentEmailService=useApi(API_URLS.savesentEmail);

    const { setInputData, Data, ComposeStatus, toggleComposestatus } = useStore();
    const Sendemail = (e) => {
        e.preventDefault()
        if (window.Email) {
            window.Email.send({
                Host: "smtp.elasticemail.com",
                Username: process.env.REACT_APP_USERNAME,
                Password: process.env.REACT_APP_PASSWORD,
                Port: 2525,
                From: "samiiwork1@gmail.com",
                To: Data.To,
                Subject: Data.Subject,
                Body: Data.Body
            }).then(
                message => alert(message)
            );
        }

        const payload={
            to:Data.To,
            from:"samiiwork1@gmail.com",
            subject:Data.Subject,
            body: Data.Body,
            date: new Date(),
            image:"",
            name: "Shahzaib uddin",
            starred: false,
            type:"sent"
        }
        sentEmailService.call(payload);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputData({ [name]: value });
        console.log(Data)
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

    return (
        <>
            <Dialog PaperProps={{ sx: dialogStyle }} open={ComposeStatus}>
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", backgroundColor: '#f2f6fc', "&>p": { fontWeight: 500, fontSize: 14 } }}>
                    <Typography>
                        New Message
                    </Typography>
                    <Close onClick={toggleComposestatus} fontSize='small' />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", padding: "0 10px 0 10px" }}>
                    <InputBase value={Data.to} onChange={handleInputChange} name="To" className="ok" sx={{ '@media(max-width:400px)': { fontSize: '12px' }, margin: "10px 0 10px 0", borderBottom: "2px solid #dcdede" }} placeholder='Recipients' />
                    <InputBase value={Data.subject} onChange={handleInputChange} name="Subject"  sx={{ '@media(max-width:400px)': { fontSize: '12px' }, borderBottom: "1px solid #dcdede" }} placeholder='Subject' />
                </Box>
                <TextField value={Data.body} onChange={handleInputChange} name="Body" multiline rows={12} sx={{ "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": { '@media(max-width:400px)': { fontSize: '12px' } }, "& .MuiOutlinedInput-notchedOutline": { border: 'none' } }} />
                <Box sx={{ position: 'absolute', width: "99%", bottom: 5, left: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button sx={{ '@media(max-width:400px)': { transform: "scale(0.9)" }, paddingBottom: 1, background: "#0b57d0", color: "#ffffff", fontWeight: 500, textTransform: "none", borderRadius: "18px" }} onClick={(e) => {toggleComposestatus(); Sendemail(e) }}>Send me</Button>
                    <DeleteOutline onClick={toggleComposestatus} />
                </Box>
            </Dialog >
        </>
    )
}
