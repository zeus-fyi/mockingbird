import {heraApi} from './axios/axios';
import axios from "axios";

interface TokenCountResponse {
    count: number;
}

const sessionID = "fake"

class HeraApiGateway {
    async sendChatGPTRequest(prompt: string): Promise<any>  {
        const url = `/v1beta/ui/openai/codegen`;
        try {
                let config = {
                headers: {
                    'Authorization': `Bearer ${sessionID}`
                },
                withCredentials: true,
            }
            return heraApi.post(url, {
                prompt: prompt,
            }, config)
        } catch (exc) {
            console.error('error sending prompt request');
            console.error(exc);
            return
        }
    }
    async getTokenCountEstimate(text: string): Promise<number>  {
        try {
            const response = await axios.post('http://localhost:5001/token-count', { text }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data.count;
        } catch (exc) {
            console.error('error sending token count request');
            console.error(exc);
            return 0
        }
    }
}
export const heraApiGateway = new HeraApiGateway();

