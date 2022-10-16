import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType,ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session  from "express-session";
import { join } from 'path';
import * as cors from 'cors';
import { ResPonse } from './common/response'
import { HttpFilter } from './common/filter'
import {NextFunction, Request, Response} from "express";
import { RoleGuard } from './guard/role.guard'
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger'

function MiddleWareAll(req:Request,res:Response,next:NextFunction){
  next()
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cors());
  app.use(MiddleWareAll)
  app.use(session({secret:"WangZai",rolling:true,name:"wangzai.id",cookie:{maxAge:null}}))
  app.useStaticAssets(join(__dirname, 'images'),{
    prefix:'/wangzai'
  });
  // app.useGlobalFilters(new HttpFilter())
  app.useGlobalInterceptors(new ResPonse())
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder().setTitle('旺仔').setDescription('啥呀这是').setVersion('1').build()
  const document =  SwaggerModule.createDocument(app,options)
  SwaggerModule.setup('/api-docs',app,document)
  // app.useGlobalGuards(new RoleGuard())
  await app.listen(3000);
}
bootstrap()
