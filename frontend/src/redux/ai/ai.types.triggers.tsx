import {Retrieval} from "./ai.types.retrievals";

export interface EvalActionTrigger {
    evalTriggerState: string;
    evalResultsTriggerOn: string;
}

export interface TriggerAction {
    triggerStrID?: string;
    triggerName: string;
    triggerGroup: string;
    triggerAction: string;
    triggerExpirationDuration: number;
    triggerExpirationTimeUnit: string;
    triggerRetrievals: Retrieval[];
    triggerActionsApprovals: TriggerActionsApproval[];
    evalTriggerActions: EvalActionTrigger[];
    evalTriggerAction: EvalActionTrigger;
    // actionMetrics : ActionMetric[];
    // actionPlatformAccounts: ActionPlatformAccount[];
}

export interface TriggerActionApprovalPutRequest {
    requestedState: string;
    triggerApproval: TriggerActionsApproval;
}
export type TriggerActionsApproval = {
    approvalStrID: string;
    evalStrID: string;
    triggerStrID: string;
    workflowResultStrID: string;
    approvalState: string;
    requestSummary: string;
    updatedAt: Date;
    requests: string
    responses: string
};
