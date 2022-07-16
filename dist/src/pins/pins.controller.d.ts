import { DistanceRequestDto } from './dtos/distance-request.dto';
import { PinParamDto } from './dtos/pin-param.dto';
import { PinsService } from './pins.service';
export declare class PinsController {
    private pinsService;
    constructor(pinsService: PinsService);
    getPinInfo(user: any, param: PinParamDto, query: DistanceRequestDto, res: any): Promise<any>;
}
