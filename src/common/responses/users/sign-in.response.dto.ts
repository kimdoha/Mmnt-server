import { Expose } from "class-transformer";

export class SignInResponseDto {

    @Expose()
    userIdx: number;

    @Expose()
    accessToken: string;

}