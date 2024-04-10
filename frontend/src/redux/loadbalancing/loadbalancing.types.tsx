import {IrisRoutingProcedure} from "./procedures.types";

export interface LoadBalancingState {
    routes: string[];
    groups: Groups;
    planUsageDetails: PlanUsageDetails;
    tableMetrics: TableMetricsSummary;
    proceduresCatalog: IrisRoutingProcedure[];
    proceduresOnTable: IrisRoutingProcedure[];
}

export interface Groups {
    [key: string]: string[];
}

export type PlanUsageDetails = {
    planName: string;
    computeUsage?: UsageMeter | null;
    tableUsage: TableUsage;
}

export type UsageMeter = {
    rateLimit: number;
    currentRate : number;
    monthlyUsage: number;
    monthlyBudgetZU: number;
}

export type TableUsage = {
    tutorialOn: true,
    endpointCount: number;
    tableCount: number;
    monthlyBudgetTableCount: number;
}

export interface ScaleFactors {
    latencyScaleFactor: number;
    errorScaleFactor: number;
    decayScaleFactor: number;
}

export interface TableMetricsSummary {
    tableName: string;
    scaleFactors: ScaleFactors;
    routes: Z[];
    metrics: Record<string, TableMetric>;
}

export interface TableMetric {
    sampleCount: number;
    metricPercentiles: MetricSample[];
}

export interface MetricSample {
    percentile: number;
    latency: number;
}

export interface Z {
    Score: number;
    Member: any;
}

// Define the new type for MetricSlice
export interface MetricAggregateRow {
    metricName: string;
    sampleCount: number;
    sampleCountLog: number; // Add a property for the log value
    p25?: string;
    p50?: string;
    p75?: string;
    p90?: string;
    p95?: string;
    p99?: string;
    p100?: string;
}

function addTimeUnitToLatency(latency: number): string {
    if (latency < 1000) {
        return `${latency.toFixed(0)}ms`;
    } else {
        return `${(latency/1000).toFixed(0)}ms`;
    }
}

export function generateMetricSlices(tableMetricsSummaries: TableMetricsSummary[]): MetricAggregateRow[] {
    const metricSlices: MetricAggregateRow[] = [];

    for (const tableMetricsSummary of tableMetricsSummaries) {
        for (const metricName in tableMetricsSummary.metrics) {
            const tableMetric = tableMetricsSummary.metrics[metricName];
            if (tableMetric.sampleCount < 1) {
                continue
            }

            const metricSlice: MetricAggregateRow = {
                metricName,
                sampleCount: tableMetric.sampleCount,
                sampleCountLog: Math.log(tableMetric.sampleCount) // Calculate log of sampleCount
            };
            for (const metricSample of tableMetric.metricPercentiles) {
                const percentile = metricSample.percentile;
                const latency = addTimeUnitToLatency(metricSample.latency);
                if (percentile === 0.9) {
                    metricSlice.p90 = latency;
                } else if (percentile === 0.95) {
                    metricSlice.p95 = latency;
                } else if (percentile === 0.25) {
                    metricSlice.p25 = latency;
                } else if (percentile === 0.5) {
                    metricSlice.p50 = latency;
                } else if (percentile === 0.75) {
                    metricSlice.p75 = latency;
                } else if (percentile === 0.99) {
                    metricSlice.p99 = latency;
                }
            }
            metricSlices.push(metricSlice);
        }
    }
    return metricSlices;
}