import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Tag } from 'src/modules/tag/entity/tag.entity'

export class ArticleDTO {
  @ApiProperty({
    description: '标题',
    example: '啊！美丽的大海'
  })
  @IsNotEmpty({ message: '请输入标题' })
  readonly title: string

  @ApiProperty({
    description: '描述',
    example: '给你讲述美丽的大海'
  })
  @IsNotEmpty({ message: '请输入描述' })
  readonly description: string

  @ApiProperty({
    description: '内容',
    example: '啊！美丽的大海，你是如此美丽'
  })
  @IsNotEmpty({ message: '请输入内容' })
  readonly content: string

  @ApiProperty({
    description: '标签',
    example: '[{id: 1}, {id: 2}]'
  })
  readonly tags?: Tag[]
}
