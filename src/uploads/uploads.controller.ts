import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { FileUploadDto } from './dtos/file-upload.dto';
import { UploadsService } from './uploads.service';

const BUCKET_NAME = 'mmntuploads';

@ApiTags('upload')
@Controller('upload')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @ApiOperation({ summary: '이미지 URL 생성 API' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'image upload',
    type: FileUploadDto,
  })
  @ApiCreatedResponse({ status: 201, description: '이미지 URL 생성 성공' })
  @ApiConflictResponse({ status: 409, description: '이미지 생성 실패' })
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any, @Res() res) {
    const responseData = await this.uploadsService.uploadImageToStorage(file);
    return res.json(
      new SuccessReponse(
        StatusCodes.CREATED,
        '이미지 URL 생성 성공',
        responseData,
      ),
    );
  }
}
