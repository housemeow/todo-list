import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import 'reflect-metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    // 在构造函数中打印参数类型信息
    console.log('AppController 构造函数的参数类型：', 
      Reflect.getMetadata('design:paramtypes', AppController));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-private')
  testPrivate() {
    const controller = new AppController(this.appService);
    // TypeScript 会在这里报错，但实际运行时可以访问
    const service = (controller as any).appService;
    return `能够访问 private 属性: ${!!service}`;
  }

  @Get('test-readonly')
  testReadonly() {
    // 1. 尝试直接重新赋值（这会在编译时报错）
    // this.appService = new AppService();  // ❌ 错误：无法分配到 'appService' ，因为它是只读属性。

    // 2. 但是可以修改对象的内部属性（如果有的话）
    // 假设 AppService 有一个 count 属性
    (this.appService as any).count = 123;  // ✅ 这是允许的！

    // 3. 即使通过类型转换，也无法重新赋值
    (this as any).appService = new AppService();  // 运行时可以，但违背了 readonly 的意图

    return '测试 readonly 完成';
  }

  // 来看看数组的 readonly
  private readonly myArray: number[] = [1, 2, 3];
  
  @Get('test-readonly-array')
  testReadonlyArray() {
    // 不能重新赋值数组
    // this.myArray = [4, 5, 6];  // ❌ 错误

    // 但可以修改数组内容！
    this.myArray.push(4);  // ✅ 这是允许的！
    this.myArray[0] = 100; // ✅ 这也是允许的！

    return this.myArray;
  }
}
