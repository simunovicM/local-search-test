import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BusinessesModule } from './businesses/businesses.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend/dist'),
    }),
    BusinessesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
