import * as React from "react";
import {Collapse, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {setTriggerAction} from "../../redux/ai/ai.reducer";
import {useDispatch} from "react-redux";
import {TriggerAction} from "../../redux/ai/ai.types.triggers";

export function ActionRow(props: { row: TriggerAction, index: number, handleClick: any, checked: boolean}) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleEditTriggerAction = async (e: any, ta: TriggerAction) => {
        e.preventDefault();
     // console.log(ta)
        dispatch(setTriggerAction(ta))
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
                <TableCell component="th" scope="row">
                    {row.triggerStrID ? row.triggerStrID : ''}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.triggerGroup}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.triggerName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.triggerAction}
                </TableCell>
                <TableCell align="left">
                    <Button onClick={event => handleEditTriggerAction(event, row)} fullWidth variant="contained" >{'Edit'}</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {row.triggerRetrievals && row.triggerRetrievals.length > 0 && (
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Eval Trigger API Details
                                </Typography>
                                <Table size="small" aria-label="sub-analysis">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Retrieval ID</TableCell>
                                            <TableCell>Group</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Platform</TableCell>
                                            <TableCell>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.triggerRetrievals && row.triggerRetrievals.map((data, dataIndex) => (
                                                <TableRow key={dataIndex}>
                                                    <TableCell>{data.retrievalStrID}</TableCell>
                                                    <TableCell>{data.retrievalGroup}</TableCell>
                                                    <TableCell>{data.retrievalName}</TableCell>
                                                    <TableCell>{data.retrievalItemInstruction && data.retrievalItemInstruction.retrievalPlatform ? data.retrievalItemInstruction.retrievalPlatform  :''}</TableCell>
                                                    <TableCell component="th" scope="row" style={{ width: '50%', whiteSpace: 'pre-wrap' }}>
                                                        {JSON.stringify(data.retrievalItemInstruction, null, 2)}
                                                    </TableCell>
                                                </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

