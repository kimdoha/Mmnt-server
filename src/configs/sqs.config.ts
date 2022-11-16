import { SqsModule } from '@ssut/nestjs-sqs';
require('dotenv/config');

export const sqsConfig = {
  consumers: [],
  producers: [
    {
      name: process.env.QUEUE_NAME,
      queueUrl: process.env.QUEUE_URL,
      region: process.env.AWS_REGION,
    },
  ],
};
