import { Injectable } from '@nestjs/common';
import { AWSConfig } from 'src/configs/aws.config';
import * as AWS from 'aws-sdk';


const BUCKET_NAME = 'mmntuploads';
@Injectable()
export class UploadsService {
    constructor() {}

    async uploadImageToStorage(file){
        const s3 = new AWS.S3();
        AWS.config.update(AWSConfig);
        const fileName = Date.now() + file.originalname;

        const upload = await new AWS.S3().upload({
                            Key: fileName,
                            Body: file.buffer,
                            Bucket: BUCKET_NAME,
                            ACL: 'public-read',
                        }).promise();

        return upload.Location;

    }
}
