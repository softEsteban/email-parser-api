import { Module } from '@nestjs/common';
import { EmailParserController } from './email.parser.controller';
import { EmailParserService } from './email.parser.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        })
    ],
    exports: [],
    controllers: [EmailParserController],
    providers: [EmailParserService],
})
export class EmailParserModule { }
