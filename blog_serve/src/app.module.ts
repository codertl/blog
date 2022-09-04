import { Module } from '@nestjs/common'
import { ArticleModule } from './modules/article/article.module'
import { typeOrmCofnig } from './config/db/typeorm.config'
import { UserModule } from './modules/user/user.module'
import { TagModule } from './modules/tag/tag.module'
import { PictureModule } from './modules/picture/picture.module'

@Module({
  imports: [
    // 使用 TypeOrm 连接数据库
    typeOrmCofnig,
    ArticleModule,
    UserModule,
    TagModule,
    PictureModule
  ]
})
export class AppModule {}
