import * as React from "react";
import {useState} from "react";

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import ChatGPTPageText from "../chatgpt/ChatGPT";

const mdTheme = createTheme();

export function AiSearchAnalysis(props: any) {
    const { code, onChange} = props;
    const [tokenEstimate, setTokenEstimate] = useState(0);
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [language, setLanguage] = useState('plaintext');
    const handleLanguageChange = (event: any) => {
        setLanguage(event.target.value);
    };

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (event: any) => {
        event.preventDefault();
        dispatch({type: 'LOGOUT_SUCCESS'})
        navigate('/login');
    }

    let buttonLabelCreate;
    let buttonDisabledCreate;
    let statusMessageCreate;
    const [requestCreateStatus, setChatRequestStatus] = useState('');
    switch (requestCreateStatus) {
        case 'pending':
            buttonLabelCreate = <CircularProgress size={20} />;
            buttonDisabledCreate = true;
            break;
        case 'success':
            buttonLabelCreate = 'Analyze';
            buttonDisabledCreate = false;
            statusMessageCreate = 'Request Sent Successfully!';
            break;
        case 'insufficientTokenBalance':
            buttonLabelCreate = 'Analyze';
            buttonDisabledCreate = true;
            statusMessageCreate = 'Insufficient Token Balance. Email alex@zeus.fyi to request more tokens.'
            break;
        case 'error':
            buttonLabelCreate = 'Analyze';
            buttonDisabledCreate = false;
            statusMessageCreate = ''
            break;
        default:
            buttonLabelCreate = 'Analyze';
            buttonDisabledCreate = false;
            break;
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                {<ChatGPTPageText code={code} language={language} onChange={onChange}/>}
            </Box>
        </ThemeProvider>
    );
}
