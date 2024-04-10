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
    setAssistants,
    setEvalFns,
    setRetrievals,
    setRuns,
    setSchemas,
    setSelectedRuns,
    setTriggerActions,
    setWorkflows
} from "../../redux/ai/ai.reducer";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import {OrchestrationsAnalysis} from "../../redux/ai/ai.types.runs";
import {WorkflowAnalysisRow} from "./WorkflowAnalysisRow";

export function WorkflowAnalysisTable(props: any) {
    const [page, setPage] = React.useState(0);
    const selectedRuns = useSelector((state: any) => state.ai.selectedRuns);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [loading, setIsLoading] = React.useState(false);
    const workflows = useSelector((state: any) => state.ai.runs);
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
        const fetchData = async (params: any) => {
            try {
                setIsLoading(true); // Set loading to true
                const response = await aiApiGateway.getRuns();
                dispatch(setRuns(response.data));
            } catch (error) {
                console.log("error", error);
            } finally {
                setIsLoading(false); // Set loading to false regardless of success or failure.
            }
        }
        fetchData({});
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await aiApiGateway.getWorkflowsRequest();
                const statusCode = response.status;
                if (statusCode < 400) {
                    const data = response.data;
                    dispatch(setWorkflows(data.workflows));
                    dispatch(setRetrievals(data.retrievals));
                    dispatch(setTriggerActions(data.triggerActions))
                    dispatch(setEvalFns(data.evalFns))
                    dispatch(setAssistants(data.assistants))
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
    if (workflows === null || workflows === undefined) {
        return (<div></div>)
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - workflows.length) : 0;

    const handleClick = (name: string) => {
        const currentIndex = selectedRuns.indexOf(name);
        const newSelected = [...selectedRuns];

        if (currentIndex === -1) {
            newSelected.push(name);
        } else {
            newSelected.splice(currentIndex, 1);
        }
        dispatch(setSelectedRuns(newSelected));
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = workflows.map((wf: any, ind: number) => ind);
            dispatch(setSelectedRuns(newSelected));
            return;
        }
        dispatch(setSelectedRuns([]));
    };
    return (
        <TableContainer sx={{ minWidth: 1800 }} component={Paper}>
            <Table  aria-label="workflow run analysis pagination table">
                <TableHead>
                    <TableRow style={{ backgroundColor: '#333'}} >
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={workflows.length > 0 && selectedRuns.length < workflows.length && selectedRuns.length > 0}
                                checked={workflows.length > 0 && selectedRuns.length === workflows.length}
                                onChange={handleSelectAllClick}
                            />
                        </TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} ></TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Run ID</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Name</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Group</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Type</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Active</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Run Cycles</TableCell>
                        <TableCell style={{ fontWeight: 'normal', color: 'white'}} >Token Usage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsPerPage > 0 && workflows && workflows.map((row: OrchestrationsAnalysis, index: number) => (
                        <WorkflowAnalysisRow
                            key={index}
                            row={row}
                            index={index}
                            handleClick={handleClick}
                            checked={selectedRuns.indexOf(index) >= 0 || false}
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
                            count={workflows.length}
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
