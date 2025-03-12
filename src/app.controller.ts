import { Controller, Get } from '@nestjs/common';
import { AppService, AppService2 } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService2: AppService2, private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    console.log(this.appService2.getHello()) 
    return this.appService.getHello();
  }
}
