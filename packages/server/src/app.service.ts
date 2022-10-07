import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(typeof process.env.AWS_SECRET_ACCESS_KEY);
    return 'Hello World!';
  }
}
