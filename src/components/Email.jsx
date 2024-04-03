import { StarOutlineRounded, StarRounded } from '@mui/icons-material';
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Box, Typography, Checkbox } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, Avatar } from "@nextui-org/react";
import { API_URLS } from '../APIs/API_URLS';
import TimeAgo from "react-timeago"
import { useRef } from "react";
import useStore from "./store";
import axios from 'axios';
import "../App.css"

export default function Email({ email }) {
    const queryClient = useQueryClient()
    const StarRef = useRef(false)

    const navigate = useNavigate();
    const { param } = useParams();
    const onclick = () => {
        navigate(`/emails/${param}/view`, { state: email });
    }

    const { themestatus, selectedarray } = useStore()


    const UpdatestarAPI = async () => {
        await axios({
            method: API_URLS.togglestar.method,
            url: `https://backend-gmail-finalss.vercel.app/${API_URLS.togglestar.endpoint}`,
            data: [email._id]
        });

    }

    const toggleStarMutation = useMutation({
        mutationFn: () => UpdatestarAPI()
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mainquery"] })
        }
    })

    const StarChangeHandler = async () => {
        StarRef.star = !StarRef.star
        toggleStarMutation.mutate();
        console.log('Star toggled successfully');
    }


    return (
        <>
            <div
                className='box'
                style={selectedarray.includes(email._id) ? themestatus ? { backgroundColor: "#383838", height: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", border: "1px solid #d6d6d6", cursor: "pointer", borderRadius: "4px", borderCollapse: "separate" } : { backgroundColor: "#1565c0", height: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", border: "1px solid #d6d6d6", cursor: "pointer", borderRadius: "4px", borderCollapse: "separate" } : { height: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: " center", border: "1px solid #d6d6d6", cursor: "pointer", borderRadius: "4px", borderCollapse: "separate" }}>
                <Avatar
                    size="sm"
                    className="mt-2 lg:mt-2 lg:mb-2 ml-2"
                    showFallback
                    src='https://images.unsplash.com/broken' />
                <Box
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center", minWidth: "150px" }}>

                    <Checkbox onClick={() => StarChangeHandler()}
                        sx={param === "bin" || param === "draft" ? { display: "none" } : { display: { lg: "flex" } }}
                        checked={email.starred || StarRef.star}
                        icon={<StarOutlineRounded sx={{ color: "black" }} />}
                        size='small'
                        checkedIcon={<StarRounded />} />

                    <Box onClick={onclick}
                        sx={{ width: { md: "200px", lg: "300px" }, fontSize: { xs: "11px", lg: "14px" }, fontWeight: 500 }}>
                        <span style={{fontWeight:400, marginLeft:"5px"}}>From:</span> {email.name}
                    </Box>

                </Box>

                {
                    param === "draft" ?
                        <Chip
                            onClick={onclick}
                            className="ml-auto transform scale-80"
                            color="danger"
                            variant="shadow">
                            {email.type}
                        </Chip>
                        :
                        <Chip
                            onClick={onclick}
                            className="ml-auto hidden sm:flex transform scale-80"
                            radius='md'
                            color="primary"
                            variant="flat">
                            {email.type}
                        </Chip>
                }

                <Box
                    onClick={onclick}
                    sx={{ paddingLeft: "40px", display: "flex", flexGrow: 1, alignItems: "baseline", }}>
                    <Typography
                        sx={{ paddingLeft: "7px", fontSize: { xs: "11px", lg: "14px" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: { xs: "260px", sm: "500px", lg: "700px" } }}>
                        {email.subject}&nbsp;-&nbsp;{email.body}
                    </Typography>
                    <Typography
                        sx={{ marginLeft: "auto", marginRight: "5px", fontSize: { lg: "12px", xs: "10px" } }}>
                        <TimeAgo
                            minPeriod={60}
                            date={email.date} />
                    </Typography>
                </Box>

            </div>

        </>
    )
}
