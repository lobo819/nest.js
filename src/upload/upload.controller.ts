import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {join} from "path";
import type {Response} from "express";
import {zip} from 'compressing'


@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file){
    console.log(file)
    return '123'
  }

  @Get('export')
  downLoad(@Res() res:Response){
    const url =join(__dirname,'../images/1665678346929.jpg')
    res.download(url)
  }

  @Get('stream')
  async down (@Res() res:Response){
    const url =join(__dirname,'../images/1665678346929.jpg')
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader(
        'Content-Disposition',
        `attachment; filename=bona`,
    )
    tarStream.pipe(res)

  }
}
