import RunningGif from "../assets/RunningGif.gif"
import { Button, Input } from '@nextui-org/react'
import DataObjectIcon from '@mui/icons-material/DataObject';
import React from 'react'
import { useNavigate } from 'react-router-dom';



export default function Landing() {
    const appnav = useNavigate()
    const handleclick = () => {
      
        appnav('/emails/inbox')
    }
    
    return (
        <div style={{height:"100vh", width:"100vw",background: "linear-gradient(135deg, #f0f4f7, #dfe6e9)" }}>

        <div style={{ height: "100vh",width: "80vw" ,margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily:"arial", fontSize: "16px" }}>
            📩 Gmail Clone
            
            <br />
            Tech used:<br />
            🔨) React Query - To Cache fetched data & prevent unneccesary refetching of data.<br />
            🔨) Zustand - Global State management, no boiler plate code.<br />
            🔨) MUI & Next.UI - Aesthetic designs and components.<br />
            🔨) Express backend - MVC architecture followed.<br />
            🔨) Mongodb Atlas - CRUD operations performed on data collections. <br />
            <Button className="mt-3" onClick={() => handleclick()} variant='shadow' color='success' size='medium' startContent={<DataObjectIcon />} >Redirect to App</Button>
            <div style={{height:"120px", width:"120px"}} >
            <img src={RunningGif} style={{marginTop:"10px" ,height: "150px"}} />
            </div>
        </div>
        </div>
    )
}
