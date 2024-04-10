import {EvalMetric} from "./ai.types.evals";
import {Orchestration} from "./ai.types";

export interface AggregatedData {
    workflowResultID: number;
    responseID: number;
    sourceTaskID: number;
    taskName: string;
    taskType: string;
    runningCycleNumber: number;
    chunkOffset: number;
    searchWindowUnixStart: number;
    searchWindowUnixEnd: number;
    iterationCount: number;
    skipAnalysis: boolean;
    model: string;
    prompt?: string; // or a more specific type if the structure of prompt is known
    metadata?: string; // or a more specific type if the structure of metadata is known
    completionChoices?: string; // similar to metadata, define a more specific type if possible
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
}

export interface OrchestrationsAnalysis {
    totalWorkflowTokenUsage: number;
    runCycles: number;
    aggregatedData: AggregatedData[];
    orchestration: Orchestration;
    aggregatedEvalResults: EvalMetric[]; // Added array of EvalMetricsResult
}

export interface OrchDetailsMap {
    [index: string]: OrchestrationsAnalysis;
}
