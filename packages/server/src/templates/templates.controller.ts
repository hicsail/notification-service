import { Controller, Get } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs';

@Controller('templates')
export class TemplatesController {
    constructor(private readonly templateService: TemplatesService) { }

    @Get('/')
    getTemplate(): any {
        return this.templateService.getTemplate();
    }
}
