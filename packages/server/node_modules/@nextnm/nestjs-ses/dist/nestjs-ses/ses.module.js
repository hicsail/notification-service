"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tokens_1 = require("./tokens/tokens");
const ses_service_1 = require("./services/relay/ses.service");
let SesModule = SesModule_1 = class SesModule {
    static forRoot(config) {
        return {
            module: SesModule_1,
            providers: [
                { provide: tokens_1.AKI_KEY, useValue: config.AKI_KEY },
                {
                    provide: tokens_1.REGION,
                    useValue: config.REGION,
                },
                { provide: tokens_1.SECRET, useValue: config.SECRET },
                ses_service_1.SesService,
            ],
            exports: [ses_service_1.SesService],
        };
    }
};
SesModule = SesModule_1 = __decorate([
    common_1.Module({})
], SesModule);
exports.SesModule = SesModule;
//# sourceMappingURL=ses.module.js.map