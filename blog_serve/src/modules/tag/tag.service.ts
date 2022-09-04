import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdDTO } from 'src/common/dto/id.dto'
import { Repository } from 'typeorm'
import { TagCreateDTO } from './dto/tag-create.dto'
import { TagUpdateDTO } from './dto/tag-update.dto'
import { Tag } from './entity/tag.entity'
import { TagInfoVO } from './vo/tag-info.vo'
import { TagListVO } from './vo/tag-list.vo'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async getMore(): Promise<TagListVO> {
    const getList = this.tagRepository
      .createQueryBuilder('tag')
      .select(['tag.id', 'tag.label'])
      .where({ isDelete: false })
      .getMany()

    const result = await getList
    return {
      list: result
    }
  }

  async create(tagCreateDTO: TagCreateDTO): Promise<TagInfoVO> {
    const { label } = tagCreateDTO
    const hasTag = await this.tagRepository.findOneBy({ label })
    if (hasTag) throw new NotFoundException(`${label}标签已存在`)

    const tag = new Tag()
    tag.label = label
    const result = await this.tagRepository.save(tag)

    return {
      info: result
    }
  }
  async update(tagUpdateDTO: TagUpdateDTO): Promise<TagInfoVO> {
    const { id, label } = tagUpdateDTO
    const tag = await this.tagRepository.findOneBy({ id })

    tag.label = label
    const result = await this.tagRepository.save(tag)

    return {
      info: result
    }
  }

  async remove(IdDTO: IdDTO): Promise<TagInfoVO> {
    const { id } = IdDTO
    const tag = await this.tagRepository.findOneBy({ id })

    tag.isDelete = true
    const result = await this.tagRepository.save(tag)

    return {
      info: result
    }
  }
}
