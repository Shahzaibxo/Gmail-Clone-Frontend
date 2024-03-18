import { StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
import { useParams } from "react-router-dom";



export default function Email({ email, seletedemails }) {
   
    const { param } = useParams();

    

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", marginTop: "10px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", minWidth: "150px" }}>

                    <Checkbox sx={{ display: { xs: 'none', lg: 'flex' } }} checked={seletedemails.includes(email._id)} size="small" />
                    <StarBorder color="action" sx={{ display: { xs: 'none', lg: 'flex' }, marginRight: "10px" }} fontSize="small" />
                    <Typography sx={{ color: '#5F6368', minWidth: "150px", maxWidth: "250px", fontSize: "11px" }}>{param === "inbox" ? "From: " : "To: "}{email.to}</Typography>
                </Box>
                <Typography sx={{ transform: { xs: 'scale(0.9)' } ,fontSize: "12px !important", background: "#ddd", color: "#222", borderRadius: "4px", padding: "0 4px", marginRight: "10px" ,marginLeft: "auto" }}>{param}
                </Typography>

                <Box sx={{ display: "flex", flexGrow: 1, alignItems:"baseline"}}>
                    <Typography sx={{ fontSize: "14px !important", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "160px" }}>
                        {email.subject} {email.body && " - "} {email.body}
                    </Typography>
                    <Typography sx={{ color: '#5F6368', marginLeft: "auto", fontSize: { lg: "12px", xs: "10px" } }}>  {(new window.Date(email.date)).getDate()}-
                        {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                    </Typography>
                </Box>

            </Box>

        </>
    )
}
