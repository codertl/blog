import { SuccessVO } from 'src/common/dto/success.vo'
import { PictureDTO } from '../dto/picture.dto'

export class PictureInfoItem extends PictureDTO {}

export class PictureInfoVO {
  info: PictureInfoItem
}

export class PictureInfoSuccessVO extends SuccessVO {
  data: PictureInfoVO
}
