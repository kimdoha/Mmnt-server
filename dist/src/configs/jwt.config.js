"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
            expiresIn: '14d'
        },
    })
};
//# sourceMappingURL=jwt.config.js.map