import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailParserService } from './email.parser.service';
import { ApiFile } from 'src/decorators/api-file.decorator';

@ApiTags("Email Parsing Module")
@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) { }

  @ApiOperation({ summary: 'Parse email content from a web URL' })
  @Get("parse-from-url/:url")
  parseEmailFromUrl(@Param("url") url: string): any {
    return this.emailParserService.parseEmailFromUrl(url);
  }

  @ApiOperation({ summary: 'Parse email content from a uploaded EML file' })
  @Post('parse-from-file')
  @ApiFile()
  uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 20480 }),
      new FileTypeValidator({ fileType: 'message/rfc822' }),
    ],
  })) file: Express.Multer.File) {
    return this.emailParserService.parseEmailFromFile(file.path);
  }
}
