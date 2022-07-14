"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSConfig = void 0;
require('dotenv/config');
exports.AWSConfig = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
};
//# sourceMappingURL=aws.config.js.map