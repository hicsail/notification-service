export interface SesEmailOptions {
    from: string;
    to: string;
    subject: string;
    replyTo?: string;
    html?: string;
    cc?: string;
    bcc?: string[];
    text?: string;
}
export declare class SesService {
    private readonly apiKey;
    private readonly region;
    private readonly secret;
    private readonly ses;
    constructor(apiKey: any, region: any, secret: any);
    sendEmail(emailOptions: SesEmailOptions): Promise<boolean>;
}
