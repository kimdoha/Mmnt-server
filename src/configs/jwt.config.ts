import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: async () => ({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '30days',
    },
  }),
};
