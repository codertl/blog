import { ApiProperty } from '@nestjs/swagger'
import { PageDTO } from 'src/common/dto/page.dto'

export class ArticleListDTO extends PageDTO {
  @ApiProperty({
    description: 'tagId',
    example: 1,
    required: false
  })
  tagId?: number
}
