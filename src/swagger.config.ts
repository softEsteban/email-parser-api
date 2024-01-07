import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {

  const config = new DocumentBuilder()
    .setTitle('Email Parser API | Designli')
    .setDescription('Nestjs API to parse emails from Designli workflow')
    .setVersion('1.0')
    .setExternalDoc('Esteban Toro - GitHub', 'https://github.com/softEsteban') 
    .setContact("Esteban Toro", "https://etoro-roan.vercel.app/", "estebantoro.ar@gmail.com")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customfavIcon: 'https://media.licdn.com/dms/image/D560BAQFjweVPt9WPvQ/company-logo_200_200/0/1690509355553/designli_logo?e=1712793600&v=beta&t=M2c4XX8GfVLrpbT-5vrNG7Dke6iYFS8DY7KQlYW-9I8',
    customCss: `
    .swagger-ui { margin-bottom: 100px; }
    .swagger-ui .topbar { background-color: #58387b; position: sticky; top: 0; z-index: 999;}
    .swagger-ui .topbar a { max-width: 50px; }
    .swagger-ui .topbar .download-url-wrapper { display: none }
    .topbar-wrapper .link { content:url('https://media.licdn.com/dms/image/D560BAQFjweVPt9WPvQ/company-logo_200_200/0/1690509355553/designli_logo?e=1712793600&v=beta&t=M2c4XX8GfVLrpbT-5vrNG7Dke6iYFS8DY7KQlYW-9I8'); 
    `,
    customSiteTitle: 'Email Parser API',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    explorer: true
  });
}
