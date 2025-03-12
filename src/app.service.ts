import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
  }

  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class AppService2 {
  constructor(private readonly appService: AppService) {
    console.log('AppService2 被创建了！', appService);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
