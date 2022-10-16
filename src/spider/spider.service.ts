import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
const axios = require('axios')
import * as cheerio from 'cheerio'
import  * as fs from 'fs'
import  * as path from 'path'

@Injectable()
export class SpiderService {
  async findAll() {
    const urls:string[] = []
    const baseUrl = 'https://www.jpmn5.com'
    const nextText = '下一页'
    let index = 0
    const getBeauty = async () => {
      console.log(index);
      const body = await  axios.get(`https://www.jpmn5.com/Xgyw/Xgyw23489${index ? '_' + index : ''}.html`).then(async res=>res.data)
      const $ = cheerio.load(body)
      const page = $('.pagination').eq(0).find('a')
      const pageArray =  page.map(function(){
        return  $(this).text()
      }).toArray()
      if(pageArray.includes(nextText)){
        $('.article-content p img').each(function(){
          urls.push(baseUrl + $(this).attr('src'))
        })
        index++
        await getBeauty()
      }


    }
    await getBeauty()
    this.writeFile(urls)
    return 'cos'
  }

  writeFile(urls:string[]){
    urls.forEach(async url=>{
      const buffer = await axios.get(url,{responseType:"arraybuffer"}).then(res=>res.data)
      const ws =  fs.createWriteStream(path.join(__dirname,'/photo/cos'+ new Date().getTime() + '.jpg'))
      ws.write(buffer)
    })
  }
}
