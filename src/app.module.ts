import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailParserModule } from './email.parser/email.parser.module';
import { AppService } from './app.service';

@Module({
  imports: [EmailParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
