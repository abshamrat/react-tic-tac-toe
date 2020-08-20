import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// @ts-ignore
const config: TypeOrmModuleOptions =  {
  type: "sqlite",
  database: "db.sqlite3",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  migrationsTableName: "migrations",
  cli: {
    migrationsDir: "dist/migration"
  },
  migrations: [
    "dist/migration/*.js"
  ]
}
export default config;