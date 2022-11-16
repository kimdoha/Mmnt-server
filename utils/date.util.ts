import { BadRequestException } from '@nestjs/common';
import { LocalDate, LocalDateTime, nativeJs } from 'js-joda';

export class DateUtil {
  static toLocalDate(date: Date): LocalDate | null {
    if (!date) {
      throw new BadRequestException('date 가 정의 되지 않았습니다.');
    }
    return LocalDate.from(nativeJs(date));
  }

  static toLocalDateTime(date: Date): LocalDateTime | null {
    if (!date) {
      throw new BadRequestException('date 가 정의 되지 않았습니다.');
    }
    return LocalDateTime.from(nativeJs(date));
  }
}
