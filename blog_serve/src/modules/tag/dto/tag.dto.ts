import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TagDTO {
  @ApiProperty({ description: '标签名称', example: '标签名称' })
  @IsNotEmpty()
  label: string
}
