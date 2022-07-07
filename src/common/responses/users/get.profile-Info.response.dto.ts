import { Expose } from "class-transformer";

export class GetProfileInfo {

    @Expose()
    userIdx: number;

    @Expose()
    email: string;

    @Expose()
    passwordLength: number;

}