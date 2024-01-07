import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags("EML Files Test Module")
@Controller('eml-files')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Returns an example EML file with an attached JSON file' })
  @Get("attached-json")
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="json-attached-email.eml"')
  getEmlFileJSONAttached(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'public/json-attached-email.eml'));
    return new StreamableFile(file);
  }

  @ApiOperation({ summary: 'Returns an example EML file with a URL pointing to the JSON file' })
  @Get("json-in-url")
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="json-url-body-email.eml"')
  getEmlFileJSONInUrl(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'public/json-url-body-email.eml'));
    return new StreamableFile(file);
  }

  @ApiOperation({ summary: 'Returns an example EML file with a URL leading to the final site hosting the JSON' })
  @Get("json-in-sub-url")
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="json-sub-url-body-email.eml"')
  getEmlFileJSONInSubUrl(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'public/json-sub-url-body-email.eml'));
    return new StreamableFile(file);
  }
}
