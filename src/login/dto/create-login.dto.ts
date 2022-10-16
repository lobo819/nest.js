import { IsNotEmpty,IsString,Length } from 'class-validator'
export class CreateLoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,10,{
        message:'不能低于3个字符或超个10个字符'
    })
    name:string
    @IsNotEmpty()
    age:number
}
