import { ApiProperty } from '@nestjs/swagger'

export class SuccessVO {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string
}
