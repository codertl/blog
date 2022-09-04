import { IntersectionType, PartialType } from '@nestjs/swagger'
import { TagDTO } from './tag.dto'
import { IdDTO } from 'src/common/dto/id.dto'

export class TagUpdateDTO extends IntersectionType(IdDTO, PartialType(TagDTO)) {}
