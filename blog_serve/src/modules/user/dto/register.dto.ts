import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { regPhoneCN } from 'src/utils/regex.util'
export class RegisterDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '13856879088'
  })
  @Matches(regPhoneCN, { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly phone: string

  @ApiProperty({
    description: '用户名',
    example: 'single'
  })
  @IsNotEmpty({ message: '请输入用户名' })
  @IsString({ message: '用户名必须是 String 类型' })
  readonly username: string

  @ApiProperty({
    description: '用户名密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string

  @ApiProperty({
    description: '二次输入密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请再次输入密码' })
  readonly passwordRepeat: string
}
