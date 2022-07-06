import { LocalDate, LocalDateTime } from 'js-joda';
export declare class DateUtil {
    static toLocalDate(date: Date): LocalDate | null;
    static toLocalDateTime(date: Date): LocalDateTime | null;
}
