import { CustomerEntity } from '../../modules/customer/entities/customer.entity';

export const config = {
  db: {
    entities: [CustomerEntity],
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: 'e_template',
  },
};
