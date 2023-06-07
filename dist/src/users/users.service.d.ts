import { Connection, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';
import { Cache } from 'cache-manager';
import { UpdateUserInfo } from './dtos/update-userInfo.dto';
import { User } from './user.entity';
export declare class UsersService {
    private cacheManager;
    private userRepository;
    private pinRepository;
    private momentRepository;
    private jwtService;
    private connection;
    private readonly logger;
    constructor(cacheManager: Cache, userRepository: Repository<User>, pinRepository: Repository<Pin>, momentRepository: Repository<Moment>, jwtService: JwtService, connection: Connection);
    createUser(email: string, password: string): Promise<{
        userIdx: number;
        email: string;
    }>;
    signIn(email: string, password: string): Promise<SignInResponseDto>;
    updateUserInfo(userIdx: number, attrs: Partial<UpdateUserInfo>): Promise<User>;
    updateUserLocation(userIdx: number, latitude: number, longitude: number, radius: number): Promise<unknown>;
    getDetailUserInfo(userIdx: number): Promise<{}>;
    findActiveUserByUserIdx(userIdx: number): Promise<User>;
    findActiveUserByEmail(email: string): Promise<User>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
    }>;
    login(payload: any): Promise<SignInResponseDto>;
    deleteUser(userIdx: number): Promise<any>;
}
