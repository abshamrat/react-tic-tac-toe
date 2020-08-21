import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// @ts-ignore
const config: TypeOrmModuleOptions =  {
  type: "sqlite",
  database: ":memory",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  keepConnectionAlive: true,
  migrationsTableName: "migrations",
  cli: {
    migrationsDir: "dist/migration"
  },
  migrations: [
    "dist/migration/*.js"
  ]
}
export default config;