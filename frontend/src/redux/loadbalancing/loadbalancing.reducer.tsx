import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Groups, LoadBalancingState, PlanUsageDetails, TableMetricsSummary} from "./loadbalancing.types";
import {IrisRoutingProcedure} from "./procedures.types";

const initialState: LoadBalancingState = {
    routes: [],
    groups: {},
    planUsageDetails: {
        planName: '',
        computeUsage: {
            rateLimit: 0,
            currentRate: 0,
            monthlyUsage: 0,
            monthlyBudgetZU: 0
        },
        tableUsage: {
            tutorialOn: true,
            monthlyBudgetTableCount: 0,
            endpointCount: 0,
            tableCount: 0
        }
    },
    tableMetrics: {
        tableName: '',
        scaleFactors: {
            latencyScaleFactor: 0.6,
            errorScaleFactor: 3.0,
            decayScaleFactor: 0.95,
        },
        routes: [],
        metrics: {},
    },
    proceduresCatalog: [{
        name: '',
        description: '',
        protocol: '',
        orderedSteps: [],
    }],
    proceduresOnTable: [{
        name: '',
        description: '',
        protocol: '',
        orderedSteps: [],
    }]
}

const loadBalancingSlice = createSlice({
    name: 'loadBalancing',
    initialState,
    reducers: {
        setEndpoints: (state, action: PayloadAction<any[]>) => {
            state.routes = action.payload;
        },
        setGroupEndpoints: (state, action: PayloadAction<Groups>) => {
            state.groups = action.payload;
        },
        setProceduresCatalog: (state, action: PayloadAction<IrisRoutingProcedure[]>) => {
            state.proceduresCatalog = action.payload;
        },
        setProceduresOnTable: (state, action: PayloadAction<IrisRoutingProcedure[]>) => {
            state.proceduresOnTable = action.payload;
        },
        setTableMetrics: (state, action: PayloadAction<TableMetricsSummary>) => {
            state.tableMetrics = action.payload;
        },
        setUserPlanDetails: (state, action: PayloadAction<PlanUsageDetails>) => {
            state.planUsageDetails = action.payload;
        },
    }
});

export const {
    setEndpoints,
    setGroupEndpoints,
    setUserPlanDetails,
    setTableMetrics,
    setProceduresCatalog,
    setProceduresOnTable,
} = loadBalancingSlice.actions;
export default loadBalancingSlice.reducer;