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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_sqs_1 = require("@ssut/nestjs-sqs");
const ses = require("node-ses");
let EmailService = class EmailService {
    async handleMessage(message) {
        const msg = JSON.parse(message.Body);
        console.log(msg);
        var client = ses.createClient({});
        client.sendEmail({
            from: 'test@email.sail.codes',
            subject: 'Greetings',
            message: 'Hello',
            altText: 'plain text',
            to: 'hishii@bu.edu'
        }, function (err, data, res) {
            console.log(res);
        });
    }
    onProcessingError(error, message) {
    }
};
__decorate([
    (0, nestjs_sqs_1.SqsMessageHandler)('test', false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailService.prototype, "handleMessage", null);
__decorate([
    (0, nestjs_sqs_1.SqsConsumerEventHandler)('test', 'processing_error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error, Object]),
    __metadata("design:returntype", void 0)
], EmailService.prototype, "onProcessingError", null);
EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map