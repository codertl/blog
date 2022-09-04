import { Entity, Column } from 'typeorm'
import { Common } from 'src/common/entity/common.entity'

@Entity()
export class Picture extends Common {
  // 图片地址
  @Column('text')
  src: string

  // 文件签名
  @Column('text')
  sign: string
}
