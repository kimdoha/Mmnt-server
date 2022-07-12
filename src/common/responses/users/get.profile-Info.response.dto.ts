import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class GetProfileInfoResponse {

    @ApiProperty()
    @Expose()
    userIdx: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    nickname: string;

    @ApiProperty()
    @Expose()
    profileImgUrl: string;

    @ApiProperty()
    @Expose()
    pinCount: string;

    @ApiProperty()
    momentCount: string;
}