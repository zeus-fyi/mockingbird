class ConfigService  {
    private readonly apiUrl: string;
    private readonly zeusApiUrl: string;
    private readonly artemisApiUrl: string;
    private readonly heraApiUrl: string;
    private readonly stripePubKey: string;
    private readonly irisApiUrl: string;
    private readonly googClientID: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_BACKEND_ENDPOINT || 'http://localhost:9002';
        this.irisApiUrl = process.env.REACT_APP_IRIS_BACKEND_ENDPOINT || 'http://localhost:8080';
        this.zeusApiUrl = process.env.REACT_APP_ZEUS_BACKEND_ENDPOINT || 'http://localhost:9001';
        this.artemisApiUrl = process.env.REACT_APP_ARTEMIS_BACKEND_ENDPOINT || 'http://localhost:9004';
        this.heraApiUrl = process.env.REACT_APP_HERA_BACKEND_ENDPOINT || 'http://localhost:9008';
        this.googClientID = process.env.REACT_APP_GOOGLE_API_TOKEN || '';
        this.stripePubKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
    }
    public getApiUrl(): string {
        return this.apiUrl;
    }
    public getZeusApiUrl(): string {
        return this.zeusApiUrl;
    }
    public getArtemisApiUrl(): string {
        return this.artemisApiUrl;
    }
    public getHeraApiUrl(): string {
        return this.heraApiUrl;
    }
    public getStripePubKey(): string {
        return this.stripePubKey;
    }
    public getIrisApiUrl(): string {
        return this.irisApiUrl;
    }
    public getGoogClientID(): string {
        return this.googClientID;
    }
}

export const configService = new ConfigService();