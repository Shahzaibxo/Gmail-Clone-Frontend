import axios from 'axios';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { Box, Typography } from "@mui/material";
import Checkbox2 from '@mui/material/Checkbox';
import { Checkbox } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip } from "@nextui-org/react";
import TimeAgo from "react-timeago"
import "../App.css"
import { useRef } from "react";
import useStore from "./store";
import { API_URLS } from '../APIs/API_URLS';


export default function Email({ email, checkboxstatus }) {
    const Ref = useRef(false)
    const navigate = useNavigate();
    const { param } = useParams();
    const onclick = () => {
        navigate(`/emails/${param}/view`, { state: email });
    }
    const { appendToStringArray, togglefunction, refreshscreenstate,selectedarray, removeFromStringArray } = useStore()
    console.log(email)

    if (checkboxstatus === true) {
        Ref.current = false
    }
    // if(email.starred===true){
    //     Ref.star=true
    // }
    
    const handlestar= async()=>{
        Ref.star=!Ref.star
        try{
            
            await axios({
                method: API_URLS.togglestar.method,
                url: `http://localhost:8000/${API_URLS.togglestar.endpoint}`,
                data: [email._id]
              });
        }
        finally{
            togglefunction("refreshscreenstate")
        }

    }

    const selectsingleemail = () => {
        Ref.current = !Ref.current;
        if (Ref.current === true) {
            const id = email._id
            appendToStringArray(id)
        } else {
            const id = email._id
            removeFromStringArray(id)
        }
    }


    return (
        <>
            <div className='box' style={selectedarray.includes(email._id) ? {marginTop:"10px",marginBottom:"10px",backgroundColor: "#e6f0fc", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: "0px", height: "50px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", border: "1px solid #d6d6d6", cursor: "pointer", borderRadius: "4px" }:{ height: "50px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", border: "1px solid #d6d6d6", cursor: "pointer", borderRadius: "4px", marginTop:"2px",marginBottom:"2px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", minWidth: "150px" }}>
                    <Box sx={{ display: { marginLeft: "5px", lg: 'flex'} }}>
                        <Checkbox  radius="full" size="sm" isSelected={selectedarray.includes(email._id)} value={email._id} onChange={(e) => { selectsingleemail(e) }} />
                    </Box>
                    <Checkbox2 sx={ param==="bin" || param==="draft"?{display:"none"}:{display:{lg:"flex", xs:"none"} }} checked={Ref.star} icon={<StarOutlineRoundedIcon />} onClick={()=>handlestar()} size='small'  checkedIcon={<StarRoundedIcon />} />
                    <Box onClick={onclick} sx={selectedarray.length === 0 ? { padding:"0px 0 0px 0",marginLeft: "3px", width: { md: "150px", lg: "300px" }, color: '#5F6368', fontSize: { xs: "11px", lg: "14px" } } : { color: "black", marginLeft: "3px", width: { md: "150px", lg: "300px" }, fontSize: { xs: "11px", lg: "14px" } }}>
                    <Chip variant='flat' color='primary' isDisabled>{email.to}</Chip>  
                    </Box>
                </Box>
                
                {param==="draft"?<Chip onClick={onclick} className="ml-auto transform scale-80" color="danger" variant="shadow">{email.type}</Chip>:<Chip onClick={onclick} className="ml-auto transform scale-80" color="primary" variant="shadow">{email.type}</Chip>}

                <Box onClick={onclick} sx={{ display: "flex", flexGrow: 1, alignItems: "baseline", }}>
                    <Typography sx={{ marginLeft: "3px", fontSize: "14px !important", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "160px" }}>
                        {email.subject} {email.body && " - "} {email.body}
                    </Typography>
                    <Typography sx={{ color: '#5F6368', marginLeft: "auto", marginRight: "5px", fontSize: { lg: "12px", xs: "10px" } }}><TimeAgo minPeriod={60} date={email.date} />
                    </Typography>
                </Box>

            </div>  

        </>
    )
}
