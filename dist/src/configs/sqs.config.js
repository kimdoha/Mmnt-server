"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsConfig = void 0;
require('dotenv/config');
exports.sqsConfig = {
    consumers: [],
    producers: [
        {
            name: process.env.QUEUE_NAME,
            queueUrl: process.env.QUEUE_URL,
            region: process.env.AWS_REGION,
        },
    ],
};
//# sourceMappingURL=sqs.config.js.map