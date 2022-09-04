import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { Common } from 'src/common/entity/common.entity'
import { Article } from 'src/modules/article/entity/article.entity'
@Entity()
export class Tag extends Common {
  // 标签名称
  @Column('text')
  label: string

  // 文章
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[]
}
