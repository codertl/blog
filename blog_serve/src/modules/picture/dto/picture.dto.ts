import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class PictureDTO {
  @ApiProperty({
    description: '图片地址',
    example: '/upload/static/1.png'
  })
  @IsNotEmpty({ message: '请输入图片地址' })
  readonly src: string
}
