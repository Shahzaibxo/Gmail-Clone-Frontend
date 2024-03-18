import * as React from 'react';
import useStore from './store';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Sidebad_elements } from './Sidebarlist';
import { NavLink, Navigate, useParams } from 'react-router-dom'

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const { SideMenuStatus, ComposeStatus ,togglefunction } = useStore()
    const { param } = useParams()
    

    const arrayOfRoutes=["inbox","starred","sent","draft","bin","all mail"];

    if (!arrayOfRoutes.includes(param)){
        return (
            <Navigate to="/emails/inbox"/>
        )
    };
    
    const composefunc = ()=>{
        togglefunction('ComposeStatus');
        if(SideMenuStatus===true){
        togglefunction('SideMenuStatus')
        }
    };

    return (
        <>
            <Drawer variant="permanent" open={SideMenuStatus}  sx={{ "& .MuiPaper-root": { position:"relative", backgroundColor: "#f3f3fb", boxShadow: "0 5px 10px -5px rgba(0, 0, 0, 0.5)",height:"100vh" } }}>

                <List sx={{"&>a":{textDecoration:"none", color:"inherit"}}}>
                    {Sidebad_elements.map((text) => (
                        <NavLink key={text.name}  to={text.name==="compose"?null:`/emails/${text.name}`}>
                            <ListItem key={text.name} disablePadding sx={{ backgroundColor: param === text.name ? "#d3e3fd" : null, borderRadius: param === text.name ? "0 16px 16px 0" : null, display: 'block', marginLeft: "5px" }}>
                                <ListItemButton
                                    sx={text.name === "compose"?{
                                        minHeight: 40,
                                        justifyContent: open ? 'initial' : 'center',
                                        background: SideMenuStatus ? "#c2e7ff" : "none",
                                        borderRadius: 30,
                                        paddingLeft: 0.5,
                                        maxWidth: "160px",
                                        marginBottom:"10px"
                                    }:null}
                                    onClick={text.name==="compose"?composefunc:null}
                                >
                                    <ListItemIcon size="small"
                                        sx={text.name === "compose" ? {
                                            minWidth: 0,
                                            mr: open ? null : 'auto',
                                            justifyContent: 'center',
                                            backgroundColor: "none",
                                            color: "#001d35",
                                            borderRadius: "20px",
                                            textTransform: "none",


                                        } : {
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: "#001d35"

                                        }}
                                    >
                                        <text.icon sx={text.name === "compose" ? {
                                            backgroundColor: "none",
                                            background: SideMenuStatus ? "none" : "#c2e7ff",
                                            color: "#001d35",
                                            borderRadius: "16px",
                                            textTransform: "none",
                                            padding: "10px",
                                            mr: open ? 1.6 : 'auto',
                                            
                                        } : { color: "#001d35",height:"20px",
                                        width:"20px", }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text.title} sx={{ opacity: open ? 1 : 0, color: "#001d35" }} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>

            </Drawer>

        </>
    );
}