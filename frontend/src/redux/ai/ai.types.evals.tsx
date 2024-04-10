// TypeScript interface for EvalMetricsResult
import {JsonSchemaDefinition, JsonSchemaField} from "./ai.types.schemas";
import {TriggerAction} from "./ai.types.triggers";

export interface EvalMetric {
    evalMetricStrID?: string;
    evalName?: string;
    evalField?: JsonSchemaField;
    evalMetricResult?: EvalMetricsResult;
    evalOperator: string;
    evalState: string;
    evalExpectedResultState: string;
    evalMetricComparisonValues?: EvalMetricComparisonValues;
}

export interface EvalMetricsResult {
    evalMetricsResultStrID?: string;
    evalResultOutcomeBool?: boolean;
    evalResultOutcomeStateStr?: string;
    evalMetadata?: any; // Consider using a more specific type if the structure of evalMetadata is known
    evalIterationCount?: number;
    runningCycleNumber?: number;
    searchWindowUnixStart?: number;
    searchWindowUnixEnd?: number;
}

export interface EvalMetricComparisonValues {
    evalComparisonBoolean?: boolean;
    evalComparisonNumber?: number;
    evalComparisonString?: string;
    evalComparisonInteger?: number;
}

export interface EvalFnMap {
    [key: string]: { [innerKey: string]: boolean };
}

export interface EvalMap {
    [key: string]: EvalFn;
}

export type UpdateEvalMapPayload = {
    evalStrID: string;
    evalTaskStrID: string;
    value: boolean;
};

export interface EvalFn {
    evalStrID?: string;
    evalName: string;
    evalType: string;
    evalGroupName: string;
    evalModel: string;
    evalFormat: string;
    evalMultiplier?: number;
    evalCycleCount?: number;
    evalMetrics: EvalMetric[];
    triggerFunctions?: TriggerAction[];
    schemas?: JsonSchemaDefinition[];
    schemasMap?: { [key: number]: JsonSchemaDefinition };
}
