import { StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Chip } from "@nextui-org/react";
import TimeAgo from "react-timeago"
import "../App.css"


export default function Email({ email, seletedemails }) {
    const navigate = useNavigate();
    const { param } = useParams();
    const onclick = () => {
        navigate(`/emails/${param}/view`, { state: { email: email } });
    }
    return (
        <>
            
            <div className='box' style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", border: "1px solid #d6d6d6", cursor: "pointer", borderRadius: "4px" }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", minWidth: "150px" }}>
                    <Checkbox sx={{ display: { xs: 'none', lg: 'flex' } }} checked={seletedemails.includes(email._id)} size="small" />
                    <StarBorder color="action" sx={{ display: { xs: 'none', lg: 'flex' }, marginRight: "10px" }} fontSize="small" />

                    <Box onClick={onclick} sx={{ marginLeft: "3px", width: { md: "150px", lg: "300px" }, color: '#5F6368', fontSize: { xs: "11px", lg: "14px" } }}>{param === "inbox" ? "From: " : "To: "}
                        {email.to}
                    </Box>
                </Box>
                <Chip className="ml-auto transform scale-80" color="warning" variant="dot">{email.type}</Chip>

                <Box onClick={onclick} sx={{ display: "flex", flexGrow: 1, alignItems: "baseline" }}>
                    <Typography sx={{ marginLeft: "3px", fontSize: "14px !important", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "160px" }}>
                        {email.subject} {email.body && " - "} {email.body}
                    </Typography>
                    <Typography sx={{ color: '#5F6368', marginLeft: "auto", marginRight: "5px", fontSize: { lg: "12px", xs: "10px" } }}><TimeAgo minPeriod={60} date={email.date}/>
                    </Typography>
                </Box>

            </div>

        </>
    )
}
