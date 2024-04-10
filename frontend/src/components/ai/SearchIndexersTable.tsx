import * as React from "react";
import {useEffect} from "react";
import {TableContainer, TableFooter, TablePagination, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {aiApiGateway} from "../../gateway/ai";
import {
    setAiTasks,
    setAssistants,
    setEvalFns,
    setRetrievals,
    setSchemas,
    setSearchIndexers,
    setSelectedSearchIndexers,
    setTriggerActions,
    setWorkflows
} from "../../redux/ai/ai.reducer";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import {SearchIndexerParams} from "../../redux/ai/ai.types";
import {SearchIndexersRow} from "./SearchIndexersRow";

export function SearchIndexersTable(props: any) {
    const [page, setPage] = React.useState(0);
    const selected = useSelector((state: any) => state.ai.selectedSearchIndexers);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [loading, setIsLoading] = React.useState(false);
    const searchIndexers = useSelector((state: any) => state.ai.searchIndexers);
    const dispatch = useDispatch();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await aiApiGateway.getWorkflowsRequest();
                const statusCode = response.status;
                if (statusCode < 400) {
                    const data = response.data;
                    dispatch(setWorkflows(data.workflows));
                    dispatch(setAiTasks(data.tasks));
                    dispatch(setEvalFns(data.evalFns));
                    dispatch(setRetrievals(data.retrievals));
                    dispatch(setSearchIndexers(data.searchIndexers));
                    dispatch(setTriggerActions(data.triggerActions));
                    dispatch(setAssistants(data.assistants));
                    dispatch(setSchemas(data.schemas))
                } else {
                    console.log('Failed to get workflows', response);
                }
            } catch (e) {
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (<div></div>)
    }
    if (searchIndexers === null || searchIndexers === undefined) {
        return (<div></div>)
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchIndexers.length) : 0;

    const handleClick = (index: string) => {
        const currentIndex = selected.indexOf(index);
        const newSelected = [...selected];
        if (currentIndex === -1) {
            newSelected.push(index);
        } else {
            newSelected.splice(currentIndex, 1);
        }
        dispatch(setSelectedSearchIndexers(newSelected));
    };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = searchIndexers.map((wf: any, index: number) => index);
            dispatch(setSelectedSearchIndexers(newSelected));
            return;
        }
        dispatch(setSelectedSearchIndexers([] as string[]));
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="private apps pagination table">
                <TableHead>
                    <TableRow style={{ backgroundColor: '#333'}} >
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={searchIndexers.length > 0 && (selected.length < searchIndexers.length) && selected.length > 0}
                                checked={searchIndexers.length > 0 && selected.length === searchIndexers.length}
                                onChange={handleSelectAllClick}
                            />
                        </TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} ></TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Search ID</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Group</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Platform</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Active</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Query</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsPerPage > 0 && searchIndexers && searchIndexers.map((row: SearchIndexerParams, index: number) => (
                        <SearchIndexersRow
                            key={index}
                            row={row}
                            index={index}
                            handleClick={handleClick}
                            checked={selected.indexOf(index) >= 0 || false}
                        />
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={4} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={searchIndexers.length}
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
