import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { PictureDTO } from './picture.dto'

export class PictureCreateDTO extends PictureDTO {
  @ApiProperty({
    description: '图片md5',
    example: 'dfgdfgfgwse'
  })
  readonly sign?: string
}
