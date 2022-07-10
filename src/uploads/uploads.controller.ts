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
import { UploadsService } from './uploads.service';


const BUCKET_NAME = 'mmntuploads';

@Controller('uploads')
export class UploadsController {
    
    constructor(private uploadsService: UploadsService){}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file){
        try {
            return this.uploadsService.uploadImageToStorage(file);     
        } catch (e) {
            throw new BadRequestException(e.message);
        }

    }
}
