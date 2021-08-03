export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  database: 'main',
  name: 'default',
  entities: [__dirname + '/../models/main/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
}