import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
export class LoginDTO {
  @ApiProperty({
    description: '用户名',
    example: 'admin'
  })
  @IsNotEmpty({ message: '用户名' })
  readonly username: string

  @ApiProperty({
    description: '用户密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string
}
