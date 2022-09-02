import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.HOST,
    port: 13306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true //개발단계에서만 true로 둘것.
}