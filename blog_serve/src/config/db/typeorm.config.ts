import { TypeOrmModule } from '@nestjs/typeorm'
export const typeOrmCofnig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'blog',
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true
})
