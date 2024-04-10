import axios from 'axios';
import {configService} from "../../config/config";

export const awsLambdaInvoke = axios.create({
    baseURL: '',
});

export const hestiaApi = axios.create({
    baseURL: configService.getApiUrl(),
});

export const artemisApi = axios.create({
    baseURL: configService.getArtemisApiUrl(),
});

export const zeusApi = axios.create({
    baseURL: configService.getZeusApiUrl(),
});

export const heraApi = axios.create({
    baseURL: configService.getHeraApiUrl(),
});

export const irisApi = axios.create({
    baseURL: configService.getIrisApiUrl(),
});

