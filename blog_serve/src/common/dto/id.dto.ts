import { IsPositive, IsNotEmpty, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { regPositive } from '@/utils/regex.util'
export class IdDTO {
  @ApiProperty({
    description: 'id',
    example: 1
  })
  // @Matches(regPositive, { message: '请输入有效id' })
  @IsPositive({ message: '请输入有效id' })
  @IsNotEmpty({ message: 'id不可为空' })
  readonly id: number
}
