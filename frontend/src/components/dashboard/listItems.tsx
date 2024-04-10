import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import {Collapse, List, ListSubheader} from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';


export default function MainListItems() {
    const [openServices, setOpenServices] = React.useState(false);
    const dispatch = useDispatch();


    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Mockingbird
                </ListSubheader>
            }
        >
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <GraphicEqIcon />
                </ListItemIcon>
                <ListItemText primary="AI" />
            </ListItemButton>
            <ListItemButton component={Link} to="/ai/workflow/builder">
                <ListItemIcon>
                    <ConstructionIcon />
                </ListItemIcon>
                <ListItemText primary="Builder" />
            </ListItemButton>
        </List>
    );
}
