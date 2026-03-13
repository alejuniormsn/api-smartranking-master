import { UserEntity } from "./user.entity";

export const usersProviders = [
  {
    provide: "USER_REPOSITORY",
    useValue: UserEntity,
  },
];
