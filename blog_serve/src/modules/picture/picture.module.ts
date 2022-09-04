import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PictureController } from './picture.controller'
import { PictureService } from './picture.service'
import { Picture } from './entity/picture.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  controllers: [PictureController],
  providers: [PictureService]
})
export class PictureModule {}
