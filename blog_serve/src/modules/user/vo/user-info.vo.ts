import { ApiProperty } from '@nestjs/swagger'

export class UserInfoItem {
  @ApiProperty({
    description: '用户id',
    example: 1
  })
  id: number
  @ApiProperty({
    description: '用户信息',
    example: 'admin',
    required: false
  })
  username?: string
  @ApiProperty({
    description: '创建时间',
    example: '2022-08-27'
  })
  createTime: Date

  @ApiProperty({
    description: '修改时间',
    example: '2022-08-27'
  })
  updateTime: Date

  @ApiProperty({
    description: '手机号',
    example: '13856859908'
  })
  phone: string
}

export class UserInfoVO {
  @ApiProperty({ type: UserInfoItem })
  info: UserInfoItem
}

export class UserInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '数据', type: () => UserInfoVO, example: UserInfoVO })
  data: UserInfoVO

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string
}
