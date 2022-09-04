import { Entity, Column } from 'typeorm'
import { Common } from 'src/common/entity/common.entity'
@Entity()
export class User extends Common {
  // 用户名
  @Column('text')
  username: string

  // 手机号
  @Column('text')
  phone: string

  // 加密后的密码
  @Column('text', { select: false })
  password: string

  // 加密盐
  @Column('text', { select: false })
  salt: string
}
