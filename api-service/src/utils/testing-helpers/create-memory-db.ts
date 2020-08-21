// @ts-check
import { createConnection, EntitySchema, Connection } from 'typeorm';
type Entity = any | string | EntitySchema<any>;

const createMemDB = (entities: Entity[]): Promise<Connection> => {
  return createConnection({
    // name, // let TypeORM manage the connections
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false
  })
}

export {
  createMemDB
}