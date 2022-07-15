import { Module } from '@nestjs/common';
import { BusinessesModule } from './businesses/businesses.module';

@Module({
  imports: [BusinessesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
