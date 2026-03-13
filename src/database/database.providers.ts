import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "../user/entities/user.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "postgres" as Dialect,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
      });
      sequelize.addModels([UserEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
