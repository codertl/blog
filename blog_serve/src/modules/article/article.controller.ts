import { Controller, Get, Post, Put, Delete, Body, Query, UseGuards } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleListDTO } from './dto/article-list.dto'
import { IdDTO } from 'src/common/dto/id.dto'
import { ArticleCreateDTO } from './dto/article-create.dto'
import { ArticleEditDTO } from './dto/article-edit.dto'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ArticleListVO, ArticleListResponse } from './vo/article-list.vo'
import { ArticleInfoVO, ArticleInfoResponse } from './vo/article-info.vo'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  @ApiOkResponse({ description: '文章列表', type: ArticleListResponse })
  async getMore(@Query() articleListDTO: ArticleListDTO): Promise<ArticleListVO> {
    const { tagId } = articleListDTO
    if (tagId) {
      return await this.articleService.getMoreByTagId(articleListDTO)
    }
    return await this.articleService.getMore(articleListDTO)
  }

  @Get('info')
  @ApiOkResponse({ description: '文章详情', type: ArticleInfoResponse })
  getOne(@Query() idDto: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.getOne(idDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '添加文章', type: ArticleInfoResponse })
  create(@Body() articleCreateDto: ArticleCreateDTO): Promise<ArticleInfoVO> {
    return this.articleService.create(articleCreateDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('edit')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '修改文章', type: ArticleInfoResponse })
  edit(@Body() articleEditDto: ArticleEditDTO): Promise<ArticleInfoVO> {
    return this.articleService.update(articleEditDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '删除文章', type: ArticleInfoResponse })
  delete(@Body() idDto: IdDTO): Promise<ArticleInfoVO> {
    return this.articleService.delete(idDto)
  }
}
