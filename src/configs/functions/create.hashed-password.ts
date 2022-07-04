import * as crypto from 'crypto';

export async function createHashedPassword(password: string) {

    return await crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

}
