import { Expose } from "class-transformer";

export class GetProfileInfoResponse {

    @Expose()
    userIdx: number;

    @Expose()
    email: string;

    @Expose()
    nickname: string;

    @Expose()
    profileImgUrl: string;
}