import { Body, Controller, Get, Header, Param, Post, Query, StreamableFile, UploadedFile, UseInterceptors , Response} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { AllowedPath } from './AllowedFolderPath';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getListOfFilesInPahtFolder(@Query() path )
  {
    return this.appService.getListOfFiles(path);
  }

  @Get('downloadFile')
  getFileByPath(@Query() path , @Response({ passthrough: true }) res)
  {
    //return this.appService.getFileByPath(path)
    const file = createReadStream(`${AllowedPath}/${path.path}`)

    let fullPath = (path.path.split("/"))

    let fileName = fullPath[fullPath.length - 1]
    // console.log(fileName)
    res.set({
      'Content-Type': fileName.split(".")[1] ,
      'Content-Disposition': `attachment; filename = ${fileName}`,
    });
    
    return new StreamableFile(file)
  }


  @Get('streamVideo')
  getFileStreamByPath(@Query() path , @Response({ passthrough: true }) res)
  {
    const file = createReadStream(`${AllowedPath}/${path.path}`)

    let fullPath = (path.path.split("/"))

    let fileName = fullPath[fullPath.length - 1]

    return new StreamableFile(file)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File , @Query() path ) 
  {
    return this.appService.uploadNewFile(file , path);
  }
  

}
