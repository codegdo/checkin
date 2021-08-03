export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  database: 'checkin',
  name: 'checkin',
  entities: [__dirname + '/../models/checkin/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
}