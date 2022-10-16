import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Headers,
  HttpCode,
  Req,
  Res,
  Session
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Get('code')
  // createCode(@Req() req,@Res() res,@Session() session){
  //   const captcha = svgCaptcha.create({
  //     size: 4,//生成几个验证码
  //     fontSize: 50, //文字大小
  //     width: 100,  //宽度
  //     height: 34,  //高度
  //     background: '#cc9966',  //背景颜色
  //   })
  //   session.code = captcha.text
  //   res.type('image/svg+xml')
  //   res.send(captcha.data)
  //
  // }
  //
  // @Post('create')
  // createUser(@Body() body,@Session() session){
  //   console.log(body,session.code)
  //   return {
  //     code:200
  //   }
  // }

}
