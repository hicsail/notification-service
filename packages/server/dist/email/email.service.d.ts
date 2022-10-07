export declare class EmailService {
    handleMessage(message: AWS.SQS.Message): Promise<void>;
    onProcessingError(error: Error, message: AWS.SQS.Message): void;
}
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
