import * as React from "react";
import {Collapse, TableBody, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import {setRetrieval} from "../../redux/ai/ai.reducer";
import {Retrieval} from "../../redux/ai/ai.types.retrievals";
import {useDispatch} from "react-redux";

export function RetrievalsRow(props: { row: Retrieval, index: number, handleClick: any, checked: boolean}) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleEditRetrieval = async (e: any, ret: Retrieval) => {
        e.preventDefault();
        dispatch(setRetrieval(ret))
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center" >
                    <Checkbox
                        checked={checked}
                        onChange={() => handleClick(index)}
                        color="primary"
                    />
                </TableCell>
                <TableCell align="left">{row.retrievalStrID? row.retrievalStrID : ''}</TableCell>
                <TableCell align="left">{row.retrievalGroup}</TableCell>
                <TableCell align="left">{row.retrievalName}</TableCell>
                <TableCell align="left">
                    {
                        row.retrievalItemInstruction && row.retrievalItemInstruction.retrievalPlatform
                            ? (row.retrievalItemInstruction.retrievalPlatform === 'web' ? 'api' : row.retrievalItemInstruction.retrievalPlatform)
                            : ''
                    }
                </TableCell>
                <TableCell align="left">
                    <Button
                        fullWidth
                        onClick={e => handleEditRetrieval(e, row)}
                        variant="contained"
                    >
                        {'Edit'}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Retrieval Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" style={{ width: '50%', whiteSpace: 'pre-wrap' }}>
                                            {JSON.stringify(row.retrievalItemInstruction, null, 2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export const prettyPrintPromptJSON = (json: any): string => {
    try {
        // Check if the input is a string that needs to be parsed
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        // Determine if json is an object or an array and format accordingly
        if (Array.isArray(json)) {
            return JSON.stringify(json, null, 2);
        } else {
            return JSON.stringify(json.prompt, null, 2);
        }

    } catch (error) {
        // console.log('json:', json);
        // console.error('Error parsing or formatting prettyPrintPromptJSON:', error);
        return json; // Return an empty string in case of error
    }
};



export const prettyPrintJSON = (json: any): string => {
    try {
        // Check if the input is a string that needs to be parsed
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        if (Array.isArray(json)) {
            return json.map(obj => prettyPrintJSON(obj)).join('\n');
        } else {
            return JSON.stringify(json, null, 2);
        }
    } catch (error) {
        // console.error('Error parsing or formatting prettyPrintJSON:', error);
        return json; // Return an empty string in case of error
    }
};


export const prettyPrintObject = (obj: any) => {
    // If 'message' is a string that needs to be parsed
    try {
        if (obj.prompt) {
            return prettyPrintWfRunRowJSON(obj.prompt);
        } else if (obj.content) {
            return prettyPrintWfRunRowJSON(obj.content);
        } else if (obj.tool_calls) {
            return prettyPrintWfRunRowJSON(obj.tool_calls);
        } else if (obj.tool_uses) {
            return prettyPrintWfRunRowJSON(obj.tool_uses);
        } else if (obj.message) {
            return prettyPrintWfRunRowJSON(obj.message);
        } else if (obj.function) {
            return prettyPrintWfRunRowJSON(obj.function);
        } else {
            return JSON.stringify(obj, null, 2);
        }
    } catch (error) {
        // Return the original string if it can't be parsed
        return obj;
    }
};

export const prettyPrintWfRunRowJSON = (json: any): string => {
    // console.log('json:', json)
    try {
        // Determine if json is an array and format each object accordingly
        if (Array.isArray(json)) {
            return json.map(obj => prettyPrintWfRunRowJSON(obj)).join('\n');
        } else if (typeof json === 'string') {
            return prettyPrintWfRunRowJSON(JSON.parse(json))
        } else if (typeof json === 'object') {
            return prettyPrintObject(json);
        } else {
            return json; // Return an empty string in case of error
        }
    } catch (error) {
        // console.error('Error parsing or formatting prettyPrintJSON:', error);
        return json; // Return an empty string in case of error
    }
};
