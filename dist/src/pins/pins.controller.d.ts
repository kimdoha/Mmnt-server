import { PinsService } from './pins.service';
export declare class PinsController {
    private pinsService;
    constructor(pinsService: PinsService);
    createPin(userIdx: number, pin_x: number, pin_y: number): Promise<import("./pin.entity").Pin>;
}
