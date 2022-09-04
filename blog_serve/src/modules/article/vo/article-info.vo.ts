// src/modules/article/vo/article-info.vo.ts

import { ApiProperty } from '@nestjs/swagger'
import { SuccessVO } from 'src/common/dto/success.vo'
class ArticleInfoItem {
  @ApiProperty({ description: '文章id', example: 1 })
  id: number

  @ApiProperty({ description: '创建时间', example: '2021-07-03' })
  createTime: Date

  @ApiProperty({ description: '更新时间', example: '2021-07-03' })
  updateTime: Date

  @ApiProperty({ description: '文章标题', example: '文章标题' })
  title: string

  @ApiProperty({ description: '文章描述', example: '文章描述' })
  description: string

  @ApiProperty({ description: '文章内容', example: '文章内容' })
  content: string
}

export class ArticleInfoVO {
  @ApiProperty({ type: ArticleInfoItem })
  info: ArticleInfoItem
}

export class ArticleInfoResponse extends SuccessVO {
  @ApiProperty({ description: '数据', type: () => ArticleInfoVO, example: ArticleInfoVO })
  data: ArticleInfoVO
}
