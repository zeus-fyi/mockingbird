import {hestiaApi} from './axios/axios';
import {configService} from "../config/config";
const sessionID = configService.getMockingbirdBearerToken()

class LoadBalancingApiGateway {
    async getEndpoints(): Promise<any>  {
        const url = `/v1/iris/routes/read/all`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            console.log(sessionID, 'sessionID')
            return await hestiaApi.get(url, config)
        } catch (exc) {
            console.error('error sending get customer endpoints request');
            console.error(exc);
            return
        }
    }

    async getProceduresCatalog(): Promise<any>  {
        const url = `/v1/iris/procedures`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.get(url, config)
        } catch (exc) {
            console.error('error sending get customer endpoints request');
            console.error(exc);
            return
        }
    }

    async getProcedures(tableName: string): Promise<any>  {
        const url = `/v1/iris/routes/group/${tableName}/procedures`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.get(url, config)
        } catch (exc) {
            console.error('error sending get customer endpoints request');
            console.error(exc);
            return
        }
    }

    async getTableMetrics(tableName: string): Promise<any>  {
        const url = `/v1/iris/routes/group/${tableName}/metrics`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.get(url, config)
        } catch (exc) {
            console.error('error sending get customer endpoints request');
            console.error(exc);
            return
        }
    }
    async createEndpoints(payload: IrisOrgGroupRoutesRequest): Promise<any>  {
        const url = `/v1/iris/routes/create`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.post(url, payload, config)
        } catch (exc) {
            console.error('error sending get customer endpoints request');
            console.error(exc);
            return
        }
    }

    async deleteEndpoints(payload: IrisOrgGroupRoutesRequest): Promise<any>  {
        const url = `/v1/iris/routes/delete`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
                data: payload
            }
            return await hestiaApi.delete(url, config)
        } catch (exc) {
            console.error('error sending get customer endpoints request');
            console.error(exc);
            return
        }
    }
    async updateGroupRoutingTable(payload: IrisOrgGroupRoutesRequest): Promise<any>  {
        const url = `/v1/iris/routes/group/${payload.groupName}/update`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.put(url, payload, config)
        } catch (exc) {
            console.error('error sending put customer endpoints request');
            console.error(exc);
            return
        }
    }
    async removeEndpointsFromGroupRoutingTable(payload: IrisOrgGroupRoutesRequest): Promise<any>  {
        const url = `/v1/iris/routes/group/${payload.groupName}/delete`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.put(url, payload, config)
        } catch (exc) {
            console.error('error sending put customer endpoints request');
            console.error(exc);
            return
        }
    }
    async updateTutorialSetting(): Promise<any>  {
        const url = `/v1/quicknode/tutorial`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.put(url, {}, config)
        } catch (exc) {
            console.error('error sending put customer endpoints request');
            console.error(exc);
            return
        }
    }
}
export const loadBalancingApiGateway = new LoadBalancingApiGateway();

export type IrisOrgGroupRoutesRequest = {
    groupName?: string; // The '?' makes this property optional.
    routes: string[];
};
