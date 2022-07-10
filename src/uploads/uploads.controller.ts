import { 
    BadRequestException,
    Controller, 
    Post, 
    UploadedFile, 
    UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AWSConfig } from 'src/configs/aws.config';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import multer from 'multer';
import { S3 } from 'aws-sdk';


const BUCKET_NAME = 'mmntuploads';

@Controller('uploads')
export class UploadsController {
    
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file){
        const s3 = new AWS.S3();
        AWS.config.update(AWSConfig);
        const fileName = Date.now() + file.originalname;

        try {
            const upload = await new AWS.S3().upload({
                                Key: fileName,
                                Body: file.buffer,
                                Bucket: BUCKET_NAME,
                                ACL: 'public-read',
                            }).promise();


            return `https://${BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${fileName}`;

        } catch (e) {
            throw new BadRequestException(e.message);
        }

    }

}
