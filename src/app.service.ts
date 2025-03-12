import { Injectable } from '@nestjs/common';
import 'reflect-metadata';  // 确保我们可以使用反射 API

@Injectable()
export class AppService {
  constructor() {
    console.log('AppService 被创建了！');
    
    // 展示装饰器和反射的工作原理
    console.log('这个类上的装饰器：', Reflect.getMetadataKeys(AppService));
    console.log('Injectable 装饰器的元数据：', Reflect.getMetadata('injectable', AppService));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
