import { JwtModuleOptions} from '@nestjs/jwt';


export const jwtConfig: JwtModuleOptions = {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: 3600 },
};