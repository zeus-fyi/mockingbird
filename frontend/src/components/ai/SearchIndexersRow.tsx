import * as React from "react";
import {TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import {SearchIndexerParams} from "../../redux/ai/ai.types";

export function SearchIndexersRow(props: { row: SearchIndexerParams, index: number, handleClick: any, checked: boolean}) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);

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
                    {row.searchID}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.searchGroupName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.platform}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.active ? 'Yes' : 'No'}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.query}
                </TableCell>

            </TableRow>
            {/*<TableRow>*/}
            {/*    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>*/}
            {/*        <Collapse in={open} timeout="auto" unmountOnExit>*/}
            {/*            <Box sx={{ margin: 1 }}>*/}
            {/*                <Typography variant="h6" gutterBottom component="div">*/}
            {/*                    Workflow Details*/}
            {/*                </Typography>*/}
            {/*                <Table size="small" aria-label="sub-analysis">*/}
            {/*                    <TableHead>*/}
            {/*                        <TableRow>*/}
            {/*                            <TableCell>Task Name</TableCell>*/}
            {/*                            <TableCell>Task Type</TableCell>*/}
            {/*                            <TableCell>Cycle Count</TableCell>*/}
            {/*                            <TableCell style={{ width: '15%'}}>Model</TableCell>*/}
            {/*                            <TableCell style={{ width: '50%', whiteSpace: 'pre-wrap' }}>Prompt</TableCell>*/}
            {/*                            <TableCell>Retrieval Name</TableCell>*/}
            {/*                            <TableCell>Retrieval Platform</TableCell>*/}
            {/*                        </TableRow>*/}
            {/*                    </TableHead>*/}
            {/*                    <TableBody>*/}
            {/*                        {row.tasks && row.tasks.map((data, dataIndex) => (*/}
            {/*                            <TableRow key={dataIndex}>*/}
            {/*                                <TableCell>{data.taskName}</TableCell>*/}
            {/*                                <TableCell>{data.taskType}</TableCell>*/}
            {/*                                <TableCell>{data.cycleCount}</TableCell>*/}
            {/*                                <TableCell style={{ width: '15%'}}>{data.model}</TableCell>*/}
            {/*                                <TableCell style={{ width: '50%', whiteSpace: 'pre-wrap' }}>*/}
            {/*                                    {data.prompt}*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell>{data.retrievalName ? data.retrievalName : 'analysis-aggregation'}</TableCell>*/}
            {/*                                <TableCell>{data.retrievalPlatform ? data.retrievalPlatform : 'analysis-aggregation'}</TableCell>*/}
            {/*                            </TableRow>*/}
            {/*                        ))}*/}
            {/*                    </TableBody>*/}
            {/*                </Table>*/}
            {/*            </Box>*/}
            {/*        </Collapse>*/}
            {/*    </TableCell>*/}
            {/*</TableRow>*/}
        </React.Fragment>
    );
}

