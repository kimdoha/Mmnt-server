import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { AWSConfig } from 'src/configs/aws.config';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'mmntuploads';
@Injectable()
export class UploadsService {
    constructor() {}

    async uploadImageToStorage(file: any){
        try {
            
            console.log(file);
            const s3 = new AWS.S3();
            const fileName = Date.now() + file.originalname ? file.originalname : file.filename;
    
            const upload = await new AWS.S3().upload({
                                Key: fileName,
                                Body: file.buffer,
                                Bucket: BUCKET_NAME,
                                ACL: 'public-read',
                            }).promise();
    
            return { "imageUrl": upload.Location };
        } catch (e) {
            console.log(e);
            throw new ConflictException('이미지 생성 실패');
        }
    }
}
