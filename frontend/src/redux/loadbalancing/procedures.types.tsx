export type Queue = any[];

export interface IrisRoutingProcedure {
    name: string;
    description: string;
    protocol: string;
    orderedSteps?: Queue;
}

export interface BroadcastInstructions {
    routingPath: string;
    restType: string;
    payload?: any;
    maxDuration?: number; // time.Duration equivalent
    maxTries?: number;
    routingTable: string;
    fanInRules?: FanInRules;
}

export interface FanInRules {
    rule: BroadcastRules;
}

export type BroadcastRules = "returnOnFirstSuccess" | "returnAllSuccessful";

export const FanInRuleFirstValidResponse: BroadcastRules = "returnOnFirstSuccess";
export const FanInRuleReturnAllResponses: BroadcastRules = "returnAllSuccessful";

// ReturnFirstResultOnSuccess function
export function returnFirstResultOnSuccess(b: BroadcastRules): BroadcastRules {
    return FanInRuleFirstValidResponse;
}

// ReturnResultsOnSuccess function
export function returnResultsOnSuccess(b: BroadcastRules): BroadcastRules {
    return FanInRuleReturnAllResponses;
}

// Assuming iris_operators.IrisRoutingResponseETL and iris_operators.Aggregation are already defined
export interface IrisRoutingProcedureStep {
    broadcastInstructions?: BroadcastInstructions;
    transformSlice?: IrisRoutingResponseETL[]; // Replace with actual type
    aggregateMap?: { [key: string]: Aggregation }; // Replace with actual type
}
export type AggOp = "max" | "sum";

export const Max: AggOp = "max";
export const Sum: AggOp = "sum";

export function max(a: AggOp): AggOp {
    return Max;
}

export function sum(a: AggOp): AggOp {
    return Sum;
}

export interface Aggregation {
    name?: string;
    operator: AggOp;
    comparison?: Operation; // Assuming Operation is already defined
    dataType: string;
    dataSlice: IrisRoutingResponseETL[];
    sumInt?: number;
    currentMinInt?: number;
    currentMaxInt?: number;
    currentMaxFloat64?: number;
}

export interface IrisRoutingResponseETL {
    source: string;
    extractionKey: string;
    dataType: string;
    value: any; // You can replace this with a specific type if desired
}
export type Op = ">" | "<" | "==" | "!=" | ">=" | "<=";

export const OperatorGt: Op = ">";
export const OperatorLt: Op = "<";
export const OperatorEq: Op = "==";
export const OperatorNeq: Op = "!=";
export const OperatorGte: Op = ">=";
export const OperatorLte: Op = "<=";

export const Gt = "gt";
export const Gte = "gte";
export const Lt = "lt";
export const Lte = "lte";
export const Eq = "eq";
export const Neq = "neq";

export const DataTypeBool = "bool";
export const DataTypeInt = "int";
export const DataTypeStr = "string";
export const DataTypeFloat64 = "float64";

export function gt(o: Op): Op {
    return OperatorGt;
}

export function lt(o: Op): Op {
    return OperatorLt;
}

export function eq(o: Op): Op {
    return OperatorEq;
}

export function neq(o: Op): Op {
    return OperatorNeq;
}

export function gte(o: Op): Op {
    return OperatorGte;
}

export function lte(o: Op): Op {
    return OperatorLte;
}

export interface Operation {
    operator: Op;
    dataTypeX: string;
    dataTypeY?: string; // Making it optional because of "omitempty"
    dataTypeZ?: string; // Making it optional because of "omitempty"
    x: any; // Data in X
    y?: any; // Data in Y, optional because of "omitempty"
    z?: any; // Data in Z, optional because of "omitempty"
}