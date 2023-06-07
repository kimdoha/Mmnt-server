import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MmntLoger extends ConsoleLogger {    
    warn(message: string) {
        super.warn(`🚨 ${message}`);
    }
    
    debug(message: string) {
        super.debug(`🐛 ${message}`);
    }
}