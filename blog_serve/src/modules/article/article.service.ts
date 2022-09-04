import { Injectable, NotFoundException } from '@nestjs/common'
import { ArticleListDTO } from './dto/article-list.dto'
import { IdDTO } from 'src/common/dto/id.dto'
import { PageDTO } from 'src/common/dto/page.dto'
import { ArticleCreateDTO } from './dto/article-create.dto'
import { ArticleEditDTO } from './dto/article-edit.dto'
import { Article } from './entity/article.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { getPagination } from 'src/utils/index.util'

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  /**
   * 获取列表
   * @param PageDTO
   * @returns
   */
  async getMore(pageDTO: PageDTO) {
    const { page = 1, pageSize = 10 } = pageDTO
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime'
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()
    const [list, total] = await getList
    const pagination = getPagination(total, pageSize, page)
    return {
      list,
      pagination
    }
  }

  async getMoreByTagId(articleListDto: ArticleListDTO) {
    const { page = 1, pageSize = 10, tagId } = articleListDto
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: 0 })
      .andWhere('tag.id = :id', { id: tagId })
      .andWhere('tag.isDelete = :isDelete', { isDelete: false })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime'
      ])
      .addSelect(['tag.id', 'tag.label'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()

    const [list, total] = await getList
    const pagination = getPagination(total, pageSize, page)
    console.log(list)
    return {
      list,
      pagination
    }
  }
  /**
   * 获取单条
   * @param idDTO
   * @returns
   */
  async getOne(idDTO: IdDTO) {
    const { id } = idDTO
    const articleDetail = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime'
      ])
      .addSelect(['tag.id', 'tag.label'])
      .getOne()
    console.log('getOne', articleDetail)
    if (!articleDetail) throw new NotFoundException('找不到文章')
    const result = {
      info: articleDetail
    }
    return result
  }

  /**
   * 创建文章
   * @param articleCreateDTO
   * @returns
   */
  async create(articleCreateDTO: ArticleCreateDTO) {
    const article = new Article()

    for (const key in articleCreateDTO) {
      article[key] = articleCreateDTO[key]
    }
    const result = await this.articleRepository.save(article)
    return {
      info: result
    }
  }

  /**
   * 更新文章
   * @param articleEditdDTO
   * @returns
   */
  async update(articleEditdDTO: ArticleEditDTO) {
    const { id } = articleEditdDTO
    const articleToUpdate = await this.articleRepository.findOneBy({ id })

    for (const key in articleEditdDTO) {
      if (key !== 'id') {
        articleToUpdate[key] = articleEditdDTO[key]
      }
    }
    const result = await this.articleRepository.save(articleToUpdate)
    return {
      info: result
    }
  }

  // 删除文章
  async delete(idDTO: IdDTO) {
    const { id } = idDTO
    const articleToUpdate = await this.articleRepository.findOneBy({ id })
    articleToUpdate.isDelete = true
    const result = await this.articleRepository.save(articleToUpdate)
    return {
      info: result
    }
  }
}
