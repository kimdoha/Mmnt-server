import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
export declare class UsersService {
    private repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    createUser(email: string, password: string): Promise<{
        userIdx: number;
        email: string;
    }>;
    signIn(email: string, password: string): Promise<SignInResponseDto>;
    updateUserLocation(userIdx: number, location: UpdateLocationDto): Promise<import("typeorm").UpdateResult>;
    getDetailUserInfo(userIdx: number): Promise<any>;
    findActiveUserByUserIdx(userIdx: number): Promise<User>;
    findActiveUserByEmail(email: string): Promise<User>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
    }>;
    login(payload: any): Promise<SignInResponseDto>;
}
