import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AiState,
    PlatformSecretReference,
    RowIndexOpen,
    RowIndexOpenMap,
    SearchIndexerParams,
    TaskModelInstructions,
    UpdateTaskCycleCountPayload,
    UpdateTaskMapPayload
} from "./ai.types";
import {Assistant, Retrieval} from "./ai.types.retrievals";
import {JsonSchemaDefinition, JsonSchemaField} from "./ai.types.schemas";
import {EvalFn, EvalMetric, UpdateEvalMapPayload} from "./ai.types.evals";
import {OrchDetailsMap, OrchestrationsAnalysis} from "./ai.types.runs";
import {TriggerAction} from "./ai.types.triggers";

const initialState: AiState = {
    openActionApprovalRow: {
        rowIndex: 0,
        open: false
    },
    orchDetails: {},
    openRunsRow: {},
    selectedRetrievalForAnalysis: {
        retrievalStrID: '',
        retrievalName: '',
        retrievalGroup: '',
        retrievalItemInstruction: {
            retrievalPlatform: '',
            retrievalPrompt: '',
            retrievalPlatformGroups: '',
            retrievalKeywords: '',
            retrievalUsernames: '',
            discordFilters: {
                categoryTopic: '',
                categoryName: '',
                category: '',
            },
            entitiesFilter: {
                nickname: '',
                firstName: '',
                lastName: '',
                labels: [],
            },
            webFilters: {
                routingGroup: '',
                lbStrategy: '',
                endpointREST: 'GET',
                endpointRoutePath: '',
            },
            instructions: '',
        }
    },
    selectedAnalysisForRetrieval: {
        taskStrID: '',
        taskName: '',
        taskType: '',
        taskGroup: '',
        model: '',
        prompt: '',
        schemas: [],
        tokenOverflowStrategy: 'deduce',
        cycleCount: 1,
        maxTokens: 0,
        marginBuffer: 0.5,
        temperature: 1.0,
        responseFormat: '',
        },
    addSchemasView: false,
    schemas: [],
    schema: {
        schemaStrID: '0',
        isObjArray: false,
        schemaName: '',
        schemaDescription: '',
        schemaGroup: 'default',
        fields: [],
    },
    schemaField: {
        fieldName: '',
        fieldDescription: '',
        dataType: '',
        evalMetrics: [],
    },
    assistant: {
        id: '',
        object: 'assistant',
        created_at: null,
        name: '',
        description: '',
        model: '',
    },
    assistants: [],
    searchContentText: '',
    usernames: '',
    groupFilter: '',
    analysisWorkflowInstructions: '',
    aggregationWorkflowInstructions: '',
    searchResults: '',
    platformFilter: '',
    workflows: [],
    tasks: [],
    addAnalysisView: false,
    addAggregationView: false,
    addRetrievalView: false,
    addEvalFnsView: false,
    addAssistantsView: false,
    addTriggerActionsView: false,
    addTriggersToEvalFnView: false,
    addTriggerRetrievalView: false,
    addedEvalFns: [],
    addedAnalysisTasks: [],
    addedAggregateTasks: [],
    addedRetrievals: [],
    workflowBuilderEvalsTaskMap: {},
    workflowBuilderTaskMap: {},
    taskMap: {},
    evalMap: {},
    retrievalsMap: {},
    retrieval: {
        retrievalName: '',
        retrievalGroup: '',
        retrievalItemInstruction: {
            retrievalPlatform: '',
            retrievalPrompt: '',
            retrievalPlatformGroups: '',
            retrievalKeywords: '',
            retrievalUsernames: '',
            discordFilters: {
                categoryTopic: '',
                categoryName: '',
                category: '',
            },
            webFilters: {
                routingGroup: '',
                lbStrategy: '',
                endpointREST: 'POST',
                endpointRoutePath: '',
            },
            instructions: '',
        }
    },
    retrievals: [],
    workflowAnalysisRetrievalsMap: {},
    workflowName: '',
    workflowGroupName: '',
    selectedWorkflows: [],
    runs: [],
    selectedRuns: [],
    searchIndexers: [],
    selectedSearchIndexers: [],
    searchIndexer: {
        searchStrID: '',
        searchID: 0,
        searchGroupName: '',
        platform: '',
        maxResults: 0,
        query: '',
        active: false,
    },
    platformSecretReference: {
        secretGroupName: 'mockingbird',
        secretKeyName: '',
    },
    selectedMainTab: 0,
    selectedMainTabBuilder: 0,
    triggerAction: {
        triggerStrID: '',
        triggerName: '',
        triggerExpirationTimeUnit: '',
        triggerExpirationDuration: 0,
        triggerGroup: '',
        triggerAction: 'api',
        triggerRetrievals: [],
        triggerActionsApprovals: [],
        evalTriggerActions: [],
        evalTriggerAction: {
            evalTriggerState: '',
            evalResultsTriggerOn: '',
        },
    },
    triggerActions: [],
    evalMetric: {
        evalMetricStrID: undefined,
        evalMetricResult: undefined, // Assuming evalMetricResult is an object or undefined
        evalOperator: '',
        evalState: '',
        evalExpectedResultState: '',
        evalMetricComparisonValues: {
            evalComparisonBoolean: undefined,
            evalComparisonNumber: undefined,
            evalComparisonString: undefined,
            evalComparisonInteger: undefined
        }
    },
    evalFn: {
        evalName: '',
        evalType: '',
        evalFormat: '',
        evalGroupName: '',
        evalModel: '',
        evalMetrics: [],
        triggerFunctions: [],
        schemas: [],
        schemasMap: {},
    },
    evalFns: [],
    editAnalysisTask: {taskName: '', taskType: '',   taskGroup: '', model: '', prompt: '', schemas: [],
        marginBuffer: 0.5, temperature: 1.0,
        tokenOverflowStrategy: 'deduce', cycleCount: 1, taskStrID: '', maxTokens: 0, responseFormat: 'text',
    },
    editAggregateTask: {taskName: '', taskType: '',   taskGroup: '', model: '', prompt: '', schemas: [],
        marginBuffer: 0.5, temperature: 1.0,
        tokenOverflowStrategy: 'deduce', cycleCount: 1, taskStrID: '', maxTokens: 0, responseFormat: 'text'},
    editRetrieval:  {
        retrievalStrID: undefined, // Optional field set to undefined
        retrievalName: '',
        retrievalGroup: '',
        retrievalItemInstruction: {
            retrievalPlatform: '',
            retrievalPrompt: '', // Optional field set to empty string
            retrievalPlatformGroups: '', // Optional field set to empty string
            retrievalKeywords: '', // Optional field set to empty string
            retrievalUsernames: '',
            discordFilters: {
                categoryTopic: '', // Optional field set to empty string
                categoryName: '',
                category: '', // Optional field set to empty string
            },
            webFilters: {
                routingGroup: '', // Optional field set to empty string
                lbStrategy: '', // Optional field set to empty string
            },
            instructions: '', // Optional field set to empty string
        },
    },
}

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        setSelectedAnalysisForRetrieval: (state, action: PayloadAction<TaskModelInstructions>) => {
            state.selectedAnalysisForRetrieval = action.payload;
        },
        setSelectedRetrievalForAnalysis: (state, action: PayloadAction<Retrieval>) => {
            state.selectedRetrievalForAnalysis = action.payload;
        },
        setOpenRunsRow(state, action: PayloadAction<RowIndexOpenMap>) {
            state.openRunsRow = action.payload;
        },
        setOrchDetails(state, action: PayloadAction<OrchDetailsMap>) {
            // Merge new details into existing map without overwriting unrelated entries
            state.orchDetails = { ...state.orchDetails, ...action.payload };
        },
        setOpenActionApprovalRow(state, action: PayloadAction<RowIndexOpen>) {
            state.openActionApprovalRow = action.payload;
        },
        setAddSchemasView: (state, action: PayloadAction<boolean>) => {
            state.addSchemasView = action.payload;
        },
        setSchemaField: (state, action: PayloadAction<JsonSchemaField>) => {
            state.schemaField = action.payload;
        },
        setSchemas: (state, action: PayloadAction<JsonSchemaDefinition[]>) => {
            state.schemas = action.payload;
        },
        setSchema: (state, action: PayloadAction<JsonSchemaDefinition>) => {
            state.schema = action.payload;
        },
        setAddAssistantsView: (state, action: PayloadAction<boolean>) => {
            state.addAssistantsView = action.payload;
        },
        setAddTriggerActionsView: (state, action: PayloadAction<boolean>) => {
            state.addTriggerActionsView = action.payload;
        },
        setAddTriggerRetrievalView: (state, action: PayloadAction<boolean>) => {
            state.addTriggerRetrievalView = action.payload;
        },
        setAssistant: (state, action: PayloadAction<Assistant>) => {
            state.assistant = action.payload;
        },
        setAssistants: (state, action: PayloadAction<Assistant[]>) => {
            state.assistants = action.payload;
        },
        setEditAnalysisTask: (state, action: PayloadAction<TaskModelInstructions>) => {
            state.editAnalysisTask = action.payload;
        },
        setEditAggregateTask: (state, action: PayloadAction<TaskModelInstructions>) => {
            state.editAggregateTask = action.payload;
        },
        setRetrieval: (state, action: PayloadAction<Retrieval>) => {
            state.retrieval = action.payload;
        },
        setEvalFn: (state, action: PayloadAction<EvalFn>) => {
            state.evalFn = action.payload;
        },
        setEvalFns: (state, action: PayloadAction<EvalFn[]>) => {
            state.evalFns = action.payload;
        },
        setAddTriggersToEvalFnView: (state, action: PayloadAction<boolean>) => {
            state.addTriggersToEvalFnView = action.payload;
        },
        // updateActionMetrics: (state, action: PayloadAction<ActionMetric[]>) => {
        //     state.action.actionMetrics = action.payload;
        // },
        // setActionMetric: (state, action: PayloadAction<ActionMetric>) => {
        //     state.actionMetric = action.payload;
        // },
        updateEvalMetrics: (state, action: PayloadAction<EvalMetric[]>) => {
            state.evalFn.evalMetrics = action.payload;
        },
        setEvalMetric: (state, action: PayloadAction<EvalMetric>) => {
            state.evalMetric = action.payload;
        },
        setTriggerAction: (state, action: PayloadAction<TriggerAction>) => {
            state.triggerAction = action.payload;
        },
        setTriggerActions: (state, action: PayloadAction<TriggerAction[]>) => {
            state.triggerActions = action.payload;
        },
        setSelectedMainTab: (state, action: PayloadAction<number>) => {
            state.selectedMainTab = action.payload;
        },
        setSelectedMainTabBuilder: (state, action: PayloadAction<number>) => {
            state.selectedMainTabBuilder = action.payload;
        },
        setPlatformSecretReference: (state, action: PayloadAction<PlatformSecretReference>) => {
            state.platformSecretReference = action.payload;
        },
        setSearchIndexer: (state, action: PayloadAction<SearchIndexerParams>) => {
            state.searchIndexer = action.payload;
        },
        setSearchIndexers: (state, action: PayloadAction<SearchIndexerParams[]>) => {
            state.searchIndexers = action.payload;
        },
        setSelectedSearchIndexers: (state, action: PayloadAction<string[]>) => {
            state.selectedSearchIndexers = action.payload;
        },
        setWebRoutingGroup: (state, action: PayloadAction<string>) => {
            if (!state.retrieval.retrievalItemInstruction.webFilters) {
                state.retrieval.retrievalItemInstruction.webFilters = {
                    routingGroup: '',
                    lbStrategy: '',
                    maxRetries: 0,
                    backoffCoefficient: 2,
                    endpointRoutePath: '',
                    endpointREST: 'POST',
                }
            }
            state.retrieval.retrievalItemInstruction.webFilters.routingGroup = action.payload;
        },
        setRuns: (state, action: PayloadAction<OrchestrationsAnalysis[]>) => {
            state.runs = action.payload;
        },
        setSelectedRuns: (state, action: PayloadAction<string[]>) => {
            state.selectedRuns = action.payload;
        },
        setSelectedWorkflows: (state, action: PayloadAction<string[]>) => {
            state.selectedWorkflows = action.payload;
        },
        setWorkflowName: (state, action: PayloadAction<string>) => {
            state.workflowName = action.payload;
        },
        setWorkflowGroupName: (state, action: PayloadAction<string>) => {
            state.workflowGroupName = action.payload;
        },
        setRetrievalName: (state, action: PayloadAction<string>) => {
            state.retrieval.retrievalName = action.payload;
        },
        setRetrievalPlatformGroups: (state, action: PayloadAction<string>) => {
            state.retrieval.retrievalItemInstruction.retrievalPlatformGroups = action.payload;
        },
        setDiscordOptionsCategoryName: (state, action: PayloadAction<string>) => {
            if (!state.retrieval.retrievalItemInstruction.discordFilters) {
                state.retrieval.retrievalItemInstruction.discordFilters = {
                    categoryName: '',
                }
            }
            state.retrieval.retrievalItemInstruction.discordFilters.categoryName = action.payload;
        },
        setRetrievalGroup: (state, action: PayloadAction<string>) => {
            state.retrieval.retrievalGroup = action.payload;
        },
        setRetrievalKeywords: (state, action: PayloadAction<string>) => {
            state.retrieval.retrievalItemInstruction.retrievalKeywords = action.payload;
        },
        setRetrievalUsernames: (state, action: PayloadAction<string>) => {
            state.retrieval.retrievalItemInstruction.retrievalUsernames = action.payload;
        },
        setRetrievalPrompt: (state, action: PayloadAction<string>) => {
            state.retrieval.retrievalItemInstruction.retrievalPrompt = action.payload;
        },
        setAddAnalysisView: (state, action: PayloadAction<boolean>) => {
            state.addAnalysisView = action.payload;
        },
        setAddAggregationView: (state, action: PayloadAction<boolean>) => {
            state.addAggregationView = action.payload;
        },
        setAddEvalFnsView: (state, action: PayloadAction<boolean>) => {
            state.addEvalFnsView = action.payload;
        },
        setAddRetrievalView: (state, action: PayloadAction<boolean>) => {
            state.addRetrievalView = action.payload;
        },
        setUsernames: (state, action: PayloadAction<string>) => {
            state.usernames = action.payload;
        },
        setGroupFilter: (state, action: PayloadAction<string>) => {
            state.groupFilter = action.payload;
        },
        setSearchContent: (state, action: PayloadAction<string>) => {
            state.searchContentText = action.payload;
        },
        setAnalysisWorkflowInstructions: (state, action: PayloadAction<string>) => {
            state.analysisWorkflowInstructions = action.payload;
        },
        setAggregationWorkflowInstructions: (state, action: PayloadAction<string>) => {
            state.aggregationWorkflowInstructions = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<string>) => {
            state.searchResults = action.payload;
        },
        setPlatformFilter: (state, action: PayloadAction<string>) => {
            state.platformFilter = action.payload;
        },
        setWorkflows: (state, action: PayloadAction<[]>) => {
            state.workflows = action.payload;
        },
        setAiTasks: (state, action: PayloadAction<[]>) => {
            state.tasks = action.payload;
        },
        setRetrievals: (state, action: PayloadAction<Retrieval[]>) => {
            state.retrievals = action.payload;
        },
        setAddEvalFns: (state, action: PayloadAction<EvalFn[]>) => {
            state.addedEvalFns = action.payload;
            state.evalMap = {};
            for (let i = 0; i < state.addedEvalFns.length; i++) {
                const evalFn  = state.addedEvalFns[i]
                if (evalFn && evalFn.evalStrID) {
                    state.evalMap[evalFn.evalStrID] = evalFn;
                }
            }
        },
        setAddAnalysisTasks: (state, action: PayloadAction<TaskModelInstructions[]>) => {
            state.addedAnalysisTasks = action.payload;
            for (let i = 0; i < state.addedAnalysisTasks.length; i++) {
                const task  = state.addedAnalysisTasks[i]
                if (task && task.taskStrID) {
                    if (task.cycleCount <= 0) {
                        task.cycleCount = 1;
                    }
                    state.taskMap[task.taskStrID] = task;
                }
            }
        },
        setAddAggregateTasks: (state, action: PayloadAction<TaskModelInstructions[]>) => {
            state.addedAggregateTasks = action.payload;
            for (let i = 0; i < state.addedAggregateTasks.length; i++) {
                const task  = state.addedAggregateTasks[i]
                if (task && task.taskStrID) {
                    if (task.cycleCount <= 0) {
                        task.cycleCount = 1;
                    }
                    state.taskMap[task.taskStrID] = task;
                }
            }
        },
        setAddRetrievalTasks: (state, action: PayloadAction<Retrieval[]>) => {
            state.addedRetrievals = action.payload;
            for (let i = 0; i < state.addedRetrievals.length; i++) {
                const retrieval  = state.addedRetrievals[i]
                if (retrieval && retrieval.retrievalStrID) {
                    state.retrievalsMap[retrieval.retrievalStrID] = retrieval;
                }
            }
        },
        setAnalysisRetrievalsMap: (state, action: PayloadAction<UpdateTaskMapPayload>) => {
            const { key, subKey, value } = action.payload;
            if (value) {
                if (!state.workflowAnalysisRetrievalsMap[key]) {
                    state.workflowAnalysisRetrievalsMap[key] = {};
                }
                state.workflowAnalysisRetrievalsMap[key][subKey] = true;
            } else {
                if (state.workflowAnalysisRetrievalsMap[key]) {
                    delete state.workflowAnalysisRetrievalsMap[key][subKey];

                    // Check if the main key has no inner keys left
                    if (Object.keys(state.workflowAnalysisRetrievalsMap[key]).length === 0) {
                        // If so, delete the main key from the map
                        delete state.workflowAnalysisRetrievalsMap[key];
                    }
                }
            }
        },
        setEvalsTaskMap: (state, action: PayloadAction<UpdateEvalMapPayload>) => {
            const { evalStrID, evalTaskStrID, value } = action.payload;
            if (value) {
                if (!state.workflowBuilderEvalsTaskMap[evalTaskStrID]) {
                    state.workflowBuilderEvalsTaskMap[evalTaskStrID] = {};
                }
                state.workflowBuilderEvalsTaskMap[evalTaskStrID][evalStrID] = true;
            } else {
                if (state.workflowBuilderEvalsTaskMap[evalTaskStrID]) {
                    delete state.workflowBuilderEvalsTaskMap[evalTaskStrID][evalStrID];

                    // Check if the main key has no inner keys left
                    if (Object.keys(state.workflowBuilderEvalsTaskMap[evalTaskStrID]).length === 0) {
                        // If so, delete the main key from the map
                        delete state.workflowBuilderEvalsTaskMap[evalTaskStrID];
                    }
                }
            }
        },
        setTaskMap: (state, action: PayloadAction<UpdateTaskCycleCountPayload>) => {
            const { key, count } = action.payload;
            const tmp = state.taskMap[key]
            if (count <= 0) {
                tmp.cycleCount = 1;
            } else {
                tmp.cycleCount = count;
            }
            state.taskMap[key] = tmp;
        },
        setEvalMap: (state, action: PayloadAction<UpdateTaskCycleCountPayload>) => {
            const { key, count } = action.payload;
            const tmp = state.evalMap[key]
            if (count <= 0) {
                tmp.evalCycleCount = 1;
            } else {
                tmp.evalCycleCount = count;
            }
            state.evalMap[key] = tmp;
        },
        setWorkflowBuilderTaskMap: (state, action: PayloadAction<UpdateTaskMapPayload>) => {
            const { key, subKey, value } = action.payload;
            if (value) {
                if (!state.workflowBuilderTaskMap[key]) {
                    state.workflowBuilderTaskMap[key] = {};
                }
                state.workflowBuilderTaskMap[key][subKey] = true;
            } else {
                if (state.workflowBuilderTaskMap[key]) {
                    delete state.workflowBuilderTaskMap[key][subKey];

                    // Check if the main key has no inner keys left
                    if (Object.keys(state.workflowBuilderTaskMap[key]).length === 0) {
                        // If so, delete the main key from the map
                        delete state.workflowBuilderTaskMap[key];
                    }
                }
            }
        },
        removeAggregationFromWorkflowBuilderTaskMap: (state, action: PayloadAction<UpdateTaskMapPayload>) => {
            const { key, subKey, value } = action.payload;
                if (state.workflowBuilderTaskMap[key]) {
                    // Delete all subkeys from the value
                    Object.keys(state.workflowBuilderTaskMap[key]).forEach(subKey => {
                        delete state.workflowBuilderTaskMap[key][subKey];
                    });

                    delete state.workflowBuilderTaskMap[key];
                }
        },
        removeEvalFnFromWorkflowBuilderEvalMap: (state, action: PayloadAction<UpdateTaskMapPayload>) => {
            const { key, subKey, value } = action.payload;
                Object.keys(state.workflowBuilderEvalsTaskMap).forEach(taskID => {
                    // Check if the taskID matches the provided key
                    if (state.workflowBuilderEvalsTaskMap[taskID]) {
                        // Delete the evalID (subKey) from the nested map if it matches the key
                        delete state.workflowBuilderEvalsTaskMap[taskID][key];
                    }
                });
        },
    }
});

export const {
    setSearchContent,
    setGroupFilter,
    setUsernames,
    setAnalysisWorkflowInstructions,
    setAggregationWorkflowInstructions,
    setSearchResults,
    setWorkflows,
    setPlatformFilter,
    setAiTasks,
    setAddAnalysisView,
    setAddAggregationView,
    setAddEvalFnsView,
    setAddRetrievalView,
    setAddAnalysisTasks,
    setAddAggregateTasks,
    setWorkflowBuilderTaskMap,
    removeAggregationFromWorkflowBuilderTaskMap,
    setTaskMap,
    setRetrievalKeywords,
    setRetrievalPrompt,
    setAddRetrievalTasks,
    setRetrievals,
    setAnalysisRetrievalsMap,
    setWorkflowGroupName,
    setWorkflowName,
    setSelectedWorkflows,
    setSelectedRuns,
    setRuns,
    setDiscordOptionsCategoryName,
    setWebRoutingGroup,
    setSelectedSearchIndexers,
    setSearchIndexers,
    setSearchIndexer,
    setPlatformSecretReference,
    setSelectedMainTab,
    setSelectedMainTabBuilder,
    setTriggerActions,
    setTriggerAction,
    // updateActionMetrics,
    // setActionMetric,
    //
    setSelectedAnalysisForRetrieval,
    setSelectedRetrievalForAnalysis,
    setEvalMetric,
    setEvalFn,
    updateEvalMetrics,
    setEvalFns,
    setAddEvalFns,
    setEvalsTaskMap,
    setEvalMap,
    removeEvalFnFromWorkflowBuilderEvalMap,
    setEditAnalysisTask,
    setEditAggregateTask,
    setRetrieval,
    setAssistants,
    setAssistant,
    setAddAssistantsView,
    setAddTriggerActionsView,
    setAddTriggersToEvalFnView,
    setSchema,
    setSchemas,
    setSchemaField,
    setAddSchemasView,
    setOpenActionApprovalRow,
    setAddTriggerRetrievalView,
    setOpenRunsRow,
    setOrchDetails
} = aiSlice.actions;
export default aiSlice.reducer;