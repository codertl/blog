import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ArticleDTO } from './article.dto'
export class ArticleCreateDTO extends ArticleDTO {}
