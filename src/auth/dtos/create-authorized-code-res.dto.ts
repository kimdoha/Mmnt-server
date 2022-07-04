import { Expose } from "class-transformer";

export class CreateAuthorizedCodeResDto {

    @Expose()
    phone: string;

    @Expose()
    value: string;
}