import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto'
import { UserInfoResponse } from './vo/user-info.vo'
import { TokenResponse, TokenVO } from './vo/token.vo'
import { IdDTO } from '@/common/dto/id.dto'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('登录模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(@Body() regtisterDTO: RegisterDTO): Promise<UserInfoResponse> {
    return await this.userService.register(regtisterDTO)
  }
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '注册', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.userService.login(loginDTO)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('userInfo')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '用户信息', type: UserInfoResponse })
  async userInfo(@Req() request: Request) {
    const res = await this.userService.getUserInfo(request)
    return res
  }
}
