"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tokens_1 = require("../../tokens/tokens");
const ses = require("node-ses");
let SesService = class SesService {
    constructor(apiKey, region, secret) {
        this.apiKey = apiKey;
        this.region = region;
        this.secret = secret;
        this.ses = ses.createClient({
            key: apiKey,
            amazon: `https://email.${region}.amazonaws.com`,
            secret,
        });
    }
    sendEmail(emailOptions) {
        const email = Object.assign(Object.assign({}, emailOptions), { message: emailOptions.html, altText: emailOptions.text });
        delete email.html;
        delete email.text;
        if (!email.message) {
            delete email.message;
        }
        if (!email.text) {
            delete email.text;
        }
        delete email.html;
        return new Promise((resolve, reject) => {
            this.ses.sendEmail(email, (err, data, res) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
};
SesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(tokens_1.AKI_KEY)),
    __param(1, common_1.Inject(tokens_1.REGION)),
    __param(2, common_1.Inject(tokens_1.SECRET)),
    __metadata("design:paramtypes", [Object, Object, Object])
], SesService);
exports.SesService = SesService;
//# sourceMappingURL=ses.service.js.map