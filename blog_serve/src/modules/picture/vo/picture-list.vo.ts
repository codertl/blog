import { PaginationDTO } from 'src/common/dto/pagination.dto'
import { SuccessVO } from 'src/common/dto/success.vo'
import { PictureDTO } from '../dto/picture.dto'

export class PictureListItem extends PictureDTO {}

export class PictureListVO {
  list: PictureListItem[]
  pagination: PaginationDTO
}

export class PictureListSuccessVO extends SuccessVO {
  data: {
    list: PictureListItem[]
    pagination: PaginationDTO
  }
}
