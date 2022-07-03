import { Expose } from "class-transformer";

export class SendCodeDto {

    @Expose()
    phone: string;

    @Expose()
    value: string;
}