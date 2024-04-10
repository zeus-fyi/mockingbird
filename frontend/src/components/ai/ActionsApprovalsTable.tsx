import * as React from "react";
import {useEffect} from "react";
import {TableContainer, TableFooter, TablePagination, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {ActionApprovalsRow} from "./ActionApprovalsRow";
import {useDispatch, useSelector} from "react-redux";
import {aiApiGateway} from "../../gateway/ai";
import {setOpenActionApprovalRow, setTriggerActions} from "../../redux/ai/ai.reducer";
import {RootState} from "../../redux/store";
import {TriggerActionsApproval} from "../../redux/ai/ai.types.triggers";

export function ActionsApprovalsTable(props: any) {
    const {selected, actions, handleClick, handleSelectAllClick, handleActionApprovalRequest} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [loading, setIsLoading] = React.useState(false);
    const { open, rowIndex } = useSelector((state: RootState) => state.ai.openActionApprovalRow);
    const handleToggle = (indexIn: number) => {
        dispatch(setOpenActionApprovalRow({rowIndex: indexIn, open: !open }));
    };
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async (params: any) => {
            try {
                setIsLoading(true); // Set loading to true
                const response = await aiApiGateway.getActions();
                dispatch(setTriggerActions(response.data));
            } catch (error) {
                console.log("error", error);
            } finally {
                setIsLoading(false); // Set loading to false regardless of success or failure.
            }
        }
        fetchData({});
    }, []);

    const countTaskValues = (): number => {
        return Object.keys(actions).length;
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    if (actions === null || actions === undefined || actions.length === 0) {
        return (<div></div>)
    }
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - actions.length) : 0;
    if (emptyRows) {
        return (<div></div>)
    }
    if (loading) {
        return (<div></div>)
    }
    const countTrueValues = (): number => {
        return Object.values(selected).filter(value => value).length;
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="actions pagination table">
                <TableHead>
                    <TableRow style={{ backgroundColor: '#333'}} >
                        {/*<TableCell padding="checkbox">*/}
                        {/*    <Checkbox*/}
                        {/*        color="primary"*/}
                        {/*        indeterminate={countTrueValues() > 0 && countTrueValues() < countTaskValues()}*/}
                        {/*        checked={(countTrueValues() === countTaskValues()) && (countTaskValues()> 0)}*/}
                        {/*        onChange={handleSelectAllClick}*/}
                        {/*    />*/}
                        {/*</TableCell>*/}
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} ></TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Trigger Name</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Trigger Group</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Trigger Env</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsPerPage > 0 && actions && actions.map((row: TriggerActionsApproval, index: number) => (
                        <ActionApprovalsRow
                            handleActionApprovalRequest={handleActionApprovalRequest}
                            key={index}
                            row={row}
                            index={index}
                            open={open && rowIndex === index}
                            rowIndex={rowIndex}
                            handleToggle={handleToggle}
                            // handleClick={handleClick}
                            // checked={selected[index] || false}
                        />
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={actions.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

