import { Expose } from "class-transformer";

export class CreateAuthorizedCodeResponseDto {

    @Expose()
    phone: string;

    @Expose()
    value: string;
}