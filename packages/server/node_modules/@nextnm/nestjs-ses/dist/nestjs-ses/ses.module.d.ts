import { ConfigurationSes } from './configuration';
import { SesService } from './services/relay/ses.service';
export declare class SesModule {
    static forRoot(config: ConfigurationSes): {
        module: typeof SesModule;
        providers: (typeof SesService | {
            provide: string;
            useValue: string;
        })[];
        exports: (typeof SesService)[];
    };
}
