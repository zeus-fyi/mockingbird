import {hestiaApi} from './axios/axios';
const sessionID = "fake"

class PlanDetailsApiGateway {
    async getPlanDetails(): Promise<any>  {
        const url = `/v1/plan/quicknode`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return await hestiaApi.get(url, config)
        } catch (exc) {
            console.error('error sending get customer resources request');
            console.error(exc);
            return
        }
    }
}
export const planDetailsApiGateway = new PlanDetailsApiGateway();
