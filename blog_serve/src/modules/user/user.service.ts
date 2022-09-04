import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { makeSalt, encryptPassword } from 'src/utils/cryptogram.util'
import { Repository } from 'typeorm'
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto'
import { User } from './entity/user.entity'
import { TokenVO } from './vo/token.vo'
import { JwtService } from '@nestjs/jwt'
import { IdDTO } from '@/common/dto/id.dto'
import { UserInfoVO } from './vo/user-info.vo'
import { Request } from 'express'

interface IUserInfo {
  id: number
  createTime: Date
  updateTime: Date
  username: string
  phone: string
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  // 校验注册信息
  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入密码不一致，请检测')
    }
    const { phone } = registerDTO
    const hasUser = await this.userRespository.findOneBy({ phone })
    if (hasUser) {
      throw new NotFoundException('用户已存在')
    }
  }
  // 注册
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO)

    const { username, password, phone } = registerDTO
    const salt = makeSalt() // 制作密码盐
    const hashPassword = encryptPassword(password, salt) // 加密密码

    const newUser: User = new User()
    newUser.username = username
    newUser.phone = phone
    newUser.password = hashPassword
    newUser.salt = salt
    const result = await this.userRespository.save(newUser)
    delete result.password
    delete result.salt
    return {
      info: {
        result
      }
    }
  }

  // 登录校验用户信息
  async checkLoginForm(loginDTO: LoginDTO): Promise<User> {
    const { username, password } = loginDTO
    const user = await this.userRespository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne()

    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    const { password: dbPassword, salt } = user
    const currentHashPassword = encryptPassword(password, salt)
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误')
    }
    return user
  }

  // 生成 token
  async certificate(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      phone: user.phone
    }
    const token = this.jwtService.sign(payload)
    return token
  }
  // 登录
  async login(loginDTO: LoginDTO): Promise<TokenVO> {
    const user = await this.checkLoginForm(loginDTO)
    const token = await this.certificate(user)
    return {
      info: {
        token
      }
    }
  }

  // 查询用户信息
  async getUserInfo(request: Request): Promise<any> {
    const { id } = request.user as IUserInfo
    const userInfo = await this.userRespository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .andWhere({ isDelete: false })
      .select(['user.id', 'user.username'])
      .getOne()
    return {
      info: userInfo
    }
  }
}
