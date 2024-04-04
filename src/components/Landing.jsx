import HttpsIcon from '@mui/icons-material/Https';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { EyeFilledIcon } from "../assets/eyessvgSlashed.jsx";
import { EyeSlashFilledIcon } from "../assets/eyesvg.jsx";
import { Snackbar } from "@mui/material";
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from "react";
import useStore from "./store.js";
import SignHook from "../Middleware/SignHook.jsx";

export default function Signup() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const { isLoading, signup } = SignHook()
    const { ErrorbarStatus, error, falsemark } = useStore()
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const param = "inbox"
    
    const handleclick = async () => {
        await signup(Email,Name ,Password)


    }
    return (
        <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(150deg, #a1c4fd, #c2e9fb)" }}>


            <div style={{
                background: "white",
                height: "360px",
                display: "flex",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "300px",
                background: "white",
                // border: "2px solid #6C8AA6", /* Replace with your desired color */
                // borderWidth: "10px",
                boxShadow:" 0 0 10px rgba(0, 0, 0, 0.3)",
                borderRadius: "20px"
            }}>
                <div style={{ margin: "0px auto" ,paddingTop: "30px", fontFamily: "arial", fontWeight: "bold", fontSize: "25px" }}> Sign up</div>
                <div style={{ width: "90%", margin: "0 auto" }}>
                    <Input
                        isClearable
                        type="text"
                        label="Name"
                        classNames={{ label: "text-black/50" }}
                        color="primary"
                        size="sm"
                        variant="underlined"
                        value={Name}
                        labelPlacement='outside'
                        placeholder="Enter your name"

                        startContent={
                            <PermIdentityIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        onChange={(e) => setName(e.target.value)}
                        // placeholder="Enter your email"
                        onClear={() => console.log("input cleared")}
                        className="max-w-xs pb-2"
                    />
                    <Input
                        isClearable
                        type="email"
                        label="Email"
                        classNames={{ label: "text-black/50" }}
                        color="primary"
                        size="sm"
                        variant="underlined"
                        value={Email}
                        labelPlacement='outside'
                        onChange={(e) => setEmail(e.target.value)}
                        startContent={
                            <MailOutlineIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        placeholder="Enter your email"
                        onClear={() => console.log("input cleared")}
                        className="max-w-xs pb-2"
                    />
                    <Input
                        size="sm"
                        label="Password"
                        classNames={{ label: "text-black/50" }}
                        variant="underlined"
                        color="primary"
                        value={Password}
                        labelPlacement='outside'
                        onChange={(e) => setPassword(e.target.value)}
                        startContent={
                            <HttpsIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        placeholder="Enter your password"
                        // placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                    />
                    {isLoading ? <Button
                        className="w-full mt-5 bg-blue-600" color="primary" variant="shadow" isLoading>
                        Loading
                    </Button> :
                        <Button
                            className="w-full mt-5 bg-blue-600" onClick={() => handleclick()} color="primary" variant="shadow">
                            Sign Up!
                        </Button>}
                </div>
                <div style={{ fontSize: "14px", margin: "0 auto" }}>Already Signed In? <span style={{ color: "#0066cc", fontWeight: "600" }}><Link to="/registration/login">Log In</Link></span></div>
                <div></div>
            </div>
                <Snackbar sx={{ width: "45vw", ".css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": { fontSize: "12px" } }} open={ErrorbarStatus} autoHideDuration={3000} onClose={() => falsemark("ErrorbarStatus")} message={error} />
        </div>


    )
}
