import { Expose } from "class-transformer";

export class SignUpResponseDto {

    @Expose()
    userIdx: number;

    @Expose()
    email: string;
}