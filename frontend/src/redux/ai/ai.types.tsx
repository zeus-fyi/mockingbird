import {Assistant, Retrieval} from "./ai.types.retrievals";
import {JsonSchemaDefinition, JsonSchemaField} from "./ai.types.schemas";
import {EvalFn, EvalFnMap, EvalMap, EvalMetric} from "./ai.types.evals";
import {OrchDetailsMap, OrchestrationsAnalysis} from "./ai.types.runs";
import {TriggerAction} from "./ai.types.triggers";

export interface RowIndexOpenMap {
    [index: number]: boolean;
}

export interface RowIndexOpen {
    rowIndex: number;
    open: boolean;
}

export interface AiState {
    openRunsRow: RowIndexOpenMap;
    openActionApprovalRow: RowIndexOpen;
    orchDetails: OrchDetailsMap;
    addSchemasView: boolean;
    schema: JsonSchemaDefinition;
    schemas: JsonSchemaDefinition[];
    schemaField: JsonSchemaField;
    assistants: Assistant[];
    assistant: Assistant;
    usernames: string;
    groupFilter: string;
    searchContentText: string;
    analysisWorkflowInstructions: string,
    aggregationWorkflowInstructions: string,
    searchResults: string;
    platformFilter: string;
    workflows: [];
    tasks: [];
    workflowName: string;
    workflowGroupName: string;
    addAnalysisView: boolean;
    addAggregationView: boolean;
    addRetrievalView: boolean;
    addTriggerRetrievalView: boolean;
    addEvalFnsView: boolean;
    addAssistantsView: boolean;
    addTriggersToEvalFnView: boolean;
    addTriggerActionsView: boolean;
    addedEvalFns: EvalFn[];
    selectedAnalysisForRetrieval: TaskModelInstructions;
    selectedRetrievalForAnalysis: Retrieval;
    addedAnalysisTasks: TaskModelInstructions[];
    addedAggregateTasks: TaskModelInstructions[];
    addedRetrievals: Retrieval[];
    workflowBuilderTaskMap: AggregateSubTasksMap
    workflowBuilderEvalsTaskMap: EvalFnMap
    taskMap: TaskMap;
    evalMap: EvalMap;
    retrievalsMap: RetrievalsMap;
    retrieval: Retrieval;
    retrievals: Retrieval[];
    workflowAnalysisRetrievalsMap: AnalysisRetrievalsMap
    selectedWorkflows: string[];
    selectedSearchIndexers: string[];
    runs: OrchestrationsAnalysis[];
    selectedRuns: string[];
    searchIndexers: SearchIndexerParams[];
    searchIndexer: SearchIndexerParams
    platformSecretReference: PlatformSecretReference;
    selectedMainTab: number;
    selectedMainTabBuilder: number;
    triggerAction: TriggerAction;
    triggerActions: TriggerAction[];
    evalFn: EvalFn
    evalFns: EvalFn[];
    evalMetric: EvalMetric;
    editAnalysisTask: TaskModelInstructions;
    editAggregateTask: TaskModelInstructions;
    editRetrieval: Retrieval;
}

// export interface ActionMetric {
//     metricName: string;
//     metricScoreThreshold: number;
//     metricPostActionMultiplier: number;
//     metricOperator: string;
// }

export interface PostWorkflowsRequest {
    workflowName: string;
    workflowGroupName: string;
    stepSize: number;
    stepSizeUnit: string;
    models: TaskMap;
    aggregateSubTasksMap?: AggregateSubTasksMap;
    analysisRetrievalsMap: AnalysisRetrievalsMap
    evalsMap: EvalMap;
    evalTasksMap?: EvalFnMap;
}

export interface TaskModelInstructions {
    taskStrID?: string;
    model: string;
    taskType: string;
    taskGroup: string;
    taskName: string;
    maxTokens: number;
    tokenOverflowStrategy: string;
    prompt: string;
    cycleCount: number;
    responseFormat: string;
    temperature?: number;
    marginBuffer: number;
    retrievals?: AnalysisRetrievalsMap;
    schemas: JsonSchemaDefinition[];
}

export interface TaskMap {
    [key: string]: TaskModelInstructions;
}

export interface AggregateSubTasksMap {
    [key: string]: { [innerKey: string]: boolean };
}

export type UpdateTaskMapPayload = {
    key: string;
    subKey: string;
    value: boolean;
};

export type UpdateTaskCycleCountPayload = {
    key: string;
    count: number;
};

export interface RetrievalsMap {
    [key: string]: Retrieval;
}

export interface AnalysisRetrievalsMap {
    [key: string]: { [innerKey: string]: boolean };
}

export interface DeleteWorkflowsActionRequest {
    workflows: WorkflowTemplate[];
}

export interface PostRunsActionRequest {
    action: string;
    runs: Orchestration[];
}

export interface PostWorkflowsActionRequest {
    action: string;
    unixStartTime: number;
    durationUnit: string;
    duration: number;
    customBasePeriod: boolean,
    customBasePeriodStepSize: number,
    customBasePeriodStepSizeUnit: string,
    workflows: WorkflowTemplate[];
}

export interface WorkflowTemplate {
    workflowID: number;
    workflowName: string;
    workflowGroup: string;
    fundamentalPeriod: number;
    fundamentalPeriodTimeUnit: string;
    tasks: Task[]; // Array of Task
}

export type Task = {
    taskName: string;
    taskType: string;
    responseFormat: string;
    model: string;
    prompt: string;
    cycleCount: number;
    retrievalName?: string;
    retrievalPlatform?: string;
    evalFns: EvalFn[]; // Array of Task
};

export type Orchestration = {
    orchestrationID: number;
    orchestrationStrID: string;
    active: boolean;
    groupName: string;
    type: string;
    instructions?: string;
    orchestrationName: string;
};

export interface DiscordFilters {
    categoryTopic?: string;
    categoryName?: string;
    category?: string;
}

export interface AiSearchParams  {
    timeRange?: string;
    window?: Window;
    retrieval: Retrieval;
}

export interface Window {
    start?: Date;
    end?: Date;
    unixStartTime?: number;
    unixEndTime?: number;
}

export interface SearchIndexerParams {
    searchStrID: string;
    searchID: number;
    searchGroupName: string;
    maxResults: number;
    query: string;
    platform: string;
    active: boolean;
    discordOpts?: DiscordIndexerOpts;
    entitiesOpts?: EntitiesIndexerOpts;
}

export interface EntitiesIndexerOpts {
    nickname?: string;
    platform?: string;
    firstName?: string | null;
    lastName?: string | null;
    labels?: string[];
}

export interface DiscordIndexerOpts {
    guildID: string;
    channelID: string;
}

export interface PlatformSecretReference {
    secretGroupName: string;
    secretKeyName: string;
}

export interface PostCreateOrUpdateSearchIndexerRequest {
    searchIndexer: SearchIndexerParams;
    platformSecretReference: PlatformSecretReference;
}

export interface PostSearchIndexerActionsRequest {
    action: string;
    searchIndexers: SearchIndexerParams[];
}

export interface TelegramIndexerOpts {
    SearchIndexerParams: SearchIndexerParams;
}
