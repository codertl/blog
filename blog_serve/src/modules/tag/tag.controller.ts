import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { IdDTO } from 'src/common/dto/id.dto'
import { TagCreateDTO } from './dto/tag-create.dto'
import { TagUpdateDTO } from './dto/tag-update.dto'
import { TagService } from './tag.service'
import { TagInfoSuccessVO, TagInfoVO } from './vo/tag-info.vo'
import { TagListSuccessVO, TagListVO } from './vo/tag-list.vo'

@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOkResponse({ description: '标签列表', type: TagListSuccessVO })
  @Get('list')
  getMore(): Promise<TagListVO> {
    return this.tagService.getMore()
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '创建标签', type: TagInfoSuccessVO })
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() tagCreateDTO: TagCreateDTO): Promise<TagInfoVO> {
    return this.tagService.create(tagCreateDTO)
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '修改标签', type: TagInfoSuccessVO })
  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  update(@Body() tagUpdateDTO: TagUpdateDTO): Promise<TagInfoVO> {
    return this.tagService.update(tagUpdateDTO)
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '删除标签', type: TagInfoSuccessVO })
  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  remove(@Body() idDTO: IdDTO): Promise<TagInfoVO> {
    return this.tagService.remove(idDTO)
  }
}
