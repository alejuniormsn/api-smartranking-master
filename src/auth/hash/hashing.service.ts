import * as bcrypt from "bcryptjs";

export class HashingService {
  hash(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  compare(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }
}
