import * as bcrypt from 'bcrypt';

export async function createHashedPassword(password: any) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
