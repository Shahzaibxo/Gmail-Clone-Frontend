import LoginHook from '../Middleware/LoginHook.jsx';
import useStore from "./store.js";
import { Link } from 'react-router-dom';
import { EyeSlashFilledIcon } from "../assets/eyesvg.jsx";
import { EyeFilledIcon } from "../assets/eyessvgSlashed.jsx";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HttpsIcon from '@mui/icons-material/Https';
import { Snackbar } from "@mui/material";
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useState } from "react";

export default function Login() {
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
    const { isLoading, login } = LoginHook()
    const { ErrorbarStatus, error, falsemark } = useStore()

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    const handleclick = async () => {
        await login(Email, Password)
        

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
                border: "2px solid #6C8AA6", /* Replace with your desired color */
                // borderWidth: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 0px 0px 4px rgba(0, 0, 0, 0.1)",

                borderRadius: "20px"
            }}>
                <div style={{ margin: "0px auto" ,paddingTop: "30px", fontFamily: "arial", fontWeight: "bold", fontSize: "25px" }}> Log In</div>
                <div style={{ width: "90%", margin: "0 auto" }}>
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
                <div style={{ fontSize: "14px", margin: "0 auto" }}>Not registered yet? <span style={{ color: "#0066cc", fontWeight: "600" }}><Link to="/registration/signup">Sign Up!</Link></span></div>
                <div></div>
            </div>
                <Snackbar sx={{ width: "45vw", ".css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root": { fontSize: "12px" } }} open={ErrorbarStatus} autoHideDuration={3000} onClose={() => falsemark("ErrorbarStatus")} message={error} />
        </div>


    )
}
