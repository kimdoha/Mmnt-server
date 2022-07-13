import { PinsService } from './pins.service';
export declare class PinsController {
    private pinsService;
    constructor(pinsService: PinsService);
    createPin(userIdx: number, pinX: number, pinY: number): Promise<import("./pin.entity").Pin>;
}
