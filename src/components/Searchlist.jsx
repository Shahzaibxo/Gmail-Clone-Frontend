import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, Avatar } from "@nextui-org/react";
import TimeAgo from "react-timeago"
import useStore from "./store";
import "../App.css"

export default function Searchlist({ email }) {
    const navigate = useNavigate();
    const { param } = useParams();
    const onclick = () => {
        navigate(`/emails/${param}/view`, { state: email });
    }

    const { themestatus } = useStore()


    return (
        <>
            <div onClick={onclick}
                className='box2'
                style={themestatus ? { background: "#EAF1FB", color: "black", height: "60px", display: "flex", flexDirection: "column", border: "1px solid #d6d6d6", borderRadius:"15px" ,cursor: "pointer", borderRadius: "4px", borderCollapse: "separate"} : { background: "#f3f3fb", color: "black", height: "60px", display: "flex", flexDirection: "column", border: "1px solid #d6d6d6", borderRadius: "15px", cursor: "pointer", borderRadius: "4px", borderCollapse: "separate" }}>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        minWidth: "120px",
                        justifyContent: "space-between", // This ensures space between the two boxes
                    }}
                >
                    <Box
                        onClick={onclick}
                        sx={{
                            width: { md: "300px", lg: "300px" },
                            fontSize: { xs: "11px", lg: "14px" },
                            fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}
                    >
                        <span style={{ fontWeight: 400, marginLeft: "5px" }}>From:</span>{" "}
                        {email.name}
                    </Box>

                    <Box>
                        <Chip
                            onClick={onclick}
                            className="h-7 transform scale-80"
                            radius="lg"
                            color="default"
                            variant="shadow"
                        >
                            {email.type}
                        </Chip>
                    </Box>
                </Box>
                <Box
                    onClick={onclick}
                    sx={{ display: "flex", flexGrow: 1, alignItems: "baseline", }}>
                    <Typography
                        sx={{ paddingLeft: "7px", fontSize: { xs: "12px", lg: "14px" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "60%" }}>
                        {email.subject}&nbsp;-&nbsp;{email.body}
                    </Typography>
                    <Typography
                        sx={{ marginLeft: "auto", marginRight: "5px", fontSize: { lg: "14px", xs: "12px" } }}>
                        <TimeAgo
                            minPeriod={60}
                            date={email.date} />
                    </Typography>
                </Box>

            </div>

        </>
    )
}
