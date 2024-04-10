import * as React from "react";
import {Box, Collapse, TableRow, Typography} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {WorkflowTemplate} from "../../redux/ai/ai.types";
import TableHead from "@mui/material/TableHead";
import {useDispatch} from "react-redux";

export function WorkflowRow(props: { row: WorkflowTemplate, index: number, handleClick: any, checked: boolean}) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleEditWorkflow = async (e: any, wf: WorkflowTemplate) => {
        e.preventDefault();
        // dispatch(setWorkflow(wf))
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
                    {row.workflowID}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.workflowName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.workflowGroup}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.fundamentalPeriod + ' ' + row.fundamentalPeriodTimeUnit}
                </TableCell>
                {/*<TableCell align="left">*/}
                {/*    <Button*/}
                {/*        fullWidth*/}
                {/*        onClick={e => handleEditWorkflow(e, row)}*/}
                {/*        variant="contained"*/}
                {/*    >*/}
                {/*        {'Edit'}*/}
                {/*    </Button>*/}
                {/*</TableCell>*/}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Workflow Details
                            </Typography>
                            <Table size="small" aria-label="sub-analysis">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Task Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Task Type
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Response Format
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Cycle Count
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '15%' }}>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Model
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{ width: '50%', whiteSpace: 'pre-wrap' }}>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Prompt
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Retrieval Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                Retrieval Platform
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.tasks && row.tasks.map((data, dataIndex) => (
                                        <TableRow key={dataIndex}>
                                            <TableCell>{data.taskName}</TableCell>
                                            <TableCell>{data.taskType}</TableCell>
                                            <TableCell>{data.responseFormat}</TableCell>
                                            <TableCell>{data.cycleCount}</TableCell>
                                            <TableCell style={{ width: '15%'}}>{data.model}</TableCell>
                                            <TableCell style={{ width: '50%', whiteSpace: 'pre-wrap' }}>
                                                {data.prompt}
                                            </TableCell>
                                            <TableCell>{data.retrievalName ? data.retrievalName : 'analysis-aggregation'}</TableCell>
                                            <TableCell>{data.retrievalPlatform ? data.retrievalPlatform : 'analysis-aggregation'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {
                                row.tasks && (
                                    <Box>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography variant="h6" gutterBottom component="div" >
                                                    Eval Details
                                                </Typography>
                                            </Box>
                                        <Table size="small" aria-label="sub-analysis2">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                        Eval Name
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                        Group
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                      N x Eval Cycles
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                        Type
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                        Model
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" component="div" fontWeight="bold">
                                                        Format
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row.tasks.map((task, taskIndex) => (
                                                    (task.evalFns || []) // Provide an empty array as fallback
                                                        .filter(evalFn => evalFn.evalName) // Filter out objects where evalName is empty
                                                        .map((evalFn, evalFnIndex) => (
                                                            <TableRow key={evalFnIndex}>
                                                                <TableCell>{evalFn.evalName}</TableCell>
                                                                <TableCell>{evalFn.evalGroupName}</TableCell>
                                                                <TableCell>{evalFn.evalCycleCount ? evalFn.evalCycleCount : 1}</TableCell>
                                                                <TableCell>{evalFn.evalType}</TableCell>
                                                                <TableCell>{evalFn.evalModel}</TableCell>
                                                                <TableCell>{evalFn.evalFormat}</TableCell>
                                                            </TableRow>
                                                        ))
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                )
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
