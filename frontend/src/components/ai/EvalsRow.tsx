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
import {useDispatch} from "react-redux";
import {setEvalFn} from "../../redux/ai/ai.reducer";
import {EvalFn} from "../../redux/ai/ai.types.evals";

export function EvalRow(props: { row: EvalFn, index: number, handleClick: any, checked: boolean}) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleEditEvalFunction = async (e: any, ef: EvalFn) => {
        e.preventDefault();
        // console.log('EvalRow: row', ef)
        dispatch(setEvalFn(ef))
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
                    {row.evalStrID ? row.evalStrID : '0'}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.evalGroupName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.evalName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.evalType}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.evalFormat}
                </TableCell>
                <TableCell align="left">
                    <Button
                        fullWidth
                        onClick={e => handleEditEvalFunction(e, row)}
                        variant="contained"
                    >
                        {'Edit'}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Eval Metrics Details
                            </Typography>
                            <Table size="small" aria-label="sub-analysis">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Schema ID</TableCell>
                                        <TableCell>Metric ID</TableCell>
                                        <TableCell>Metric Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Data Type</TableCell>
                                        <TableCell>Operator</TableCell>
                                        <TableCell>Eval State</TableCell>
                                        <TableCell>Expected Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        row.schemas && row.schemas.length > 0 ?
                                            row.schemas.map((schema, schemaIndex) => (
                                                <React.Fragment key={schemaIndex}>
                                                    <TableRow>
                                                        <TableCell>{schema.schemaName}</TableCell>
                                                    </TableRow>
                                                    {schema.fields && schema.fields.map((field, fieldIndex) => (
                                                        field.evalMetrics !== undefined && field.evalMetrics.length > 0 ? (
                                                            field.evalMetrics.map((evalMetric, evalMetricIndex) => (
                                                                <TableRow key={`${fieldIndex}-${evalMetricIndex}`}>
                                                                    <TableCell>{schema.schemaStrID}</TableCell>
                                                                    <TableCell>{evalMetric.evalMetricStrID !== undefined ? evalMetric.evalMetricStrID : ''}</TableCell>
                                                                    <TableCell>{field.fieldName}</TableCell>
                                                                    <TableCell>{field.fieldDescription}</TableCell>
                                                                    <TableCell>{field.dataType}</TableCell>
                                                                    <TableCell>{evalMetric.evalOperator !== undefined ? evalMetric.evalOperator : 'N/A'}</TableCell>
                                                                    <TableCell>{evalMetric.evalState}</TableCell>
                                                                    <TableCell>{evalMetric.evalExpectedResultState}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        ) : <div></div>
                                                    ))}
                                                </React.Fragment>
                                            )) : <div></div>
                                    }

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {row.triggerFunctions && row.triggerFunctions.length > 0 && (
                            <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Eval Triggers Details
                            </Typography>
                            <Table size="small" aria-label="sub-analysis">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Trigger Name</TableCell>
                                        <TableCell>Trigger Group</TableCell>
                                        <TableCell>Eval State</TableCell>
                                        <TableCell>Trigger On</TableCell>
                                        <TableCell>Trigger Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.triggerFunctions && row.triggerFunctions.map((data, dataIndex) => (
                                        data.evalTriggerActions && data.evalTriggerActions.map((evalTrigger, triggerIndex) => (
                                            <TableRow key={'0' + '-' + dataIndex + '-' + triggerIndex}>
                                                <TableCell>{data.triggerName}</TableCell>
                                                <TableCell>{data.triggerGroup}</TableCell>
                                                <TableCell>{evalTrigger.evalTriggerState}</TableCell>
                                                <TableCell>{evalTrigger.evalResultsTriggerOn}</TableCell>
                                                <TableCell>{data.triggerAction}</TableCell>
                                            </TableRow>
                                        ))
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
