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
import {setSchema} from "../../redux/ai/ai.reducer";
import {JsonSchemaDefinition} from "../../redux/ai/ai.types.schemas";

export function SchemasRow(props: { row: JsonSchemaDefinition, index: number, handleClick: any, checked: boolean}) {
    const { row, index, handleClick, checked } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleEditSchemaDefinition = async (e: any, sd: JsonSchemaDefinition) => {
        e.preventDefault();
        dispatch(setSchema(sd))
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
                    {row.schemaStrID ? row.schemaStrID : '0'}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.schemaGroup}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.schemaName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.isObjArray ? 'JSON Object Array' : 'JSON Object'}
                </TableCell>
                <TableCell align="left">
                    <Button
                        fullWidth
                        onClick={e => handleEditSchemaDefinition(e, row)}
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
                                Object Fields
                            </Typography>
                            <Table size="small" aria-label="sub-analysis">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Field ID</TableCell>
                                        <TableCell>Field Name</TableCell>
                                        <TableCell>Data Type</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.fields && row.fields.map((data, dataIndex) => (
                                        <TableRow key={data.fieldName}>
                                            <TableCell>{data.fieldStrID ? data.fieldStrID : ''}</TableCell>
                                            <TableCell>{data.fieldName}</TableCell>
                                            <TableCell>{data.dataType}</TableCell>
                                            <TableCell>{data.fieldDescription}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
