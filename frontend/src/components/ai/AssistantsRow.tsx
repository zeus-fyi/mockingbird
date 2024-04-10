import * as React from "react";
import {Box, Collapse, TableBody, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {setAssistant} from "../../redux/ai/ai.reducer";
import {useDispatch} from "react-redux";


export function AssistantsRow(props: any) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
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
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.name? row.name : 'Null'}</TableCell>
                <TableCell align="left">{row.description? row.description : 'Null'}</TableCell>
                <TableCell align="left">{row.model}</TableCell>
                <TableCell align="left">
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={(event) => dispatch(setAssistant(row))}
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
                                Assistant Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Instructions</TableCell>
                                        <TableCell>Tools</TableCell>
                                        <TableCell>File IDs</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" style={{ width: '50%', whiteSpace: 'pre-wrap' }}>
                                            {row.instructions}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.tools}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.fileIDs}
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
