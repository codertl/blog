import { IsNotEmpty, Matches, IsPositive } from 'class-validator'
import { IdDTO } from 'src/common/dto/id.dto'
import { ArticleDTO } from './article.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Tag } from 'src/modules/tag/entity/tag.entity'
export class ArticleEditDTO implements IdDTO, ArticleDTO {
  @ApiProperty({
    description: '文章id',
    example: 1
  })
  @IsPositive({ message: '请输入有效id' })
  @IsNotEmpty({ message: 'id不可为空' })
  id: number

  @ApiProperty({
    description: '标题',
    example: '啊！美丽的大海'
  })
  @IsNotEmpty({ message: '请输入标题' })
  title: string

  @ApiProperty({
    description: '描述',
    example: '给你讲述美丽的大海'
  })
  @IsNotEmpty({ message: '请输入标题' })
  description: string

  @ApiProperty({
    description: '内容',
    example: '啊！美丽的大海，你是如此美丽'
  })
  @IsNotEmpty({ message: '请输入标题' })
  content: string

  @ApiProperty({
    description: '标签',
    example: '[{id: 1}, {id: 2}]'
  })
  @IsNotEmpty({ message: '请输入标签' })
  tags?: Tag[]
}
