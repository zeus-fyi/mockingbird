import {EvalMetric} from "./ai.types.evals";

export interface JsonSchemaDefinition {
    schemaStrID: string;
    schemaName: string;
    schemaGroup: string;
    schemaDescription: string;
    isObjArray: boolean;
    fields: JsonSchemaField[];
}

export interface JsonSchemaField {
    fieldStrID?: string;
    fieldName: string;
    fieldDescription: string;
    dataType: string;
    fieldValue?: FieldValue;
    evalMetrics?: EvalMetric[];
}

export interface AITaskJsonSchema {
    schemaID: string;
    taskID: string;
}

export interface FieldValue {
    intValue?: number;
    stringValue?: string;
    numberValue?: number;
    booleanValue?: boolean;
    intValueSlice?: number[];
    stringValueSlice?: string[];
    numberValueSlice?: number[];
    booleanValueSlice?: boolean[];
    isValidated?: boolean;
}