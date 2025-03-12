import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, AppService2 } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppService2],
})
export class AppModule {}
