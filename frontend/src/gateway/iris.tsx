import {irisApi} from './axios/axios';
import {configService} from "../config/config";
const sessionID = configService.getmMockingbirdBearerToken()

class IrisLoadBalancingApiGateway {
    async sendJsonRpcRequest(routeGroup: string, payload: any, planName: string, ext: string): Promise<any>  {
        const url = `/v1/router/${ext}`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`,
                    'X-Route-Group': `${routeGroup}`,
                    // 'X-Load-Balancing-Strategy': 'Adaptive',
                    // 'X-Adaptive-Metrics-Key': 'JSON-RPC',
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            if (planName === "free") {
                let config = {
                    headers: {
                        'Authorization': `Bearer ${sessionID}`,
                        'X-Route-Group': `${routeGroup}`,
                        'X-Load-Balancing-Strategy': 'RoundRobin',
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
                return await irisApi.post(url, payload, config)
            }
            return await irisApi.post(url, payload, config)
        } catch (exc) {
            console.error('error sending endpoints table request');
            console.error(exc);
            return
        }
    }
    async sendIrisPostRequest(routeGroup: string, payload: any,ext: string): Promise<any>  {
        const url = `/v1/router/${ext}`;
        try {
    
            let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`,
                    'X-Route-Group': `${routeGroup}`,
                    'X-Load-Balancing-Strategy': 'RoundRobin',
                    // 'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            return await irisApi.post(url, payload, config)

        } catch (exc) {
            console.error('error sending endpoints table request');
            console.error(exc);
            return
        }
    }
    async sendIrisPutRequest(routeGroup: string, payload: any, ext: string): Promise<any>  {
        const url = `/v1/router/${ext}`;
        try {
    
            let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`,
                    'X-Route-Group': `${routeGroup}`,
                    'X-Load-Balancing-Strategy': 'RoundRobin',
                    // 'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            return await irisApi.put(url, payload, config)

        } catch (exc) {
            console.error('error sending endpoints table request');
            console.error(exc);
            return
        }
    }
    async sendIrisDeleteRequest(routeGroup: string, ext: string): Promise<any>  {
        const url = `/v1/router/${ext}`;
        try {
    
            let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`,
                    'X-Route-Group': `${routeGroup}`,
                    'X-Load-Balancing-Strategy': 'RoundRobin',
                    // 'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            return await irisApi.delete(url, config)

        } catch (exc) {
            console.error('error sending endpoints table request');
            console.error(exc);
            return
        }
    }
    async sendIrisGetRequest(routeGroup: string, payload: any, planName: string, ext: string): Promise<any>  {
        const url = `/v1/router/${ext}`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`,
                    'X-Route-Group': `${routeGroup}`,
                    'X-Load-Balancing-Strategy': 'RoundRobin',
                    // 'X-Load-Balancing-Strategy': 'Adaptive',
                    // 'X-Adaptive-Metrics-Key': 'JSON-RPC',
                    // 'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            if (planName === "free") {
                let config = {
                    headers: {
                        'Authorization': `Bearer ${sessionID}`,
                        'X-Route-Group': `${routeGroup}`,
                        'X-Load-Balancing-Strategy': 'RoundRobin',
                        // 'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
                return await irisApi.get(url, config)
            }
            return await irisApi.get(url, config)
        } catch (exc) {
            console.error('error sending endpoints table request');
            console.error(exc);
            return
        }
    }
    async updateTableScaleFactor(routeGroup: string, factorName: string, score: number): Promise<any>  {
        const url = `/v1/table/${routeGroup}/scale/${factorName}`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            return await irisApi.put(url, {score: score}, config)
        } catch (exc) {
            console.error('error sending endpoints table request');
            console.error(exc);
            return
        }
    }
}
export const IrisApiGateway = new IrisLoadBalancingApiGateway();

