import { Body, Controller, Get, Header, Param, Post, Query, StreamableFile, UploadedFile, UseInterceptors , Response, Delete} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { AllowedPath } from './AllowedFolderPath';
import { AppService } from './app.service';

@ApiTags('Intearction with FIles and Folders')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get List of Files in Folder by path' })
  @ApiResponse({ status: 200 , description : 'Needs query param for path' })

  @Get()
  getListOfFilesInPahtFolder(@Query() path )
  {
    return this.appService.getListOfFiles(path);
  }


  @ApiOperation({ summary: 'Downloads file by path' })
  @ApiResponse({ status: 200 , description : 'Needs query param for path' })
  

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

  @ApiOperation({ summary: 'Get Stream of Video File ' })
  @ApiResponse({ status: 200 , description : 'Needs query param for path' })
  

  @Get('streamVideo')
  getFileStreamByPath(@Query() path , @Response({ passthrough: true }) res)
  {
    const file = createReadStream(`${AllowedPath}/${path.path}`)

    let fullPath = (path.path.split("/"))

    let fileName = fullPath[fullPath.length - 1]

    // res.set({
    //   'Content-Type': `video/${fileName.split(".")[1]}` ,
    //   'Content-Disposition': `attachment; filename = ${fileName}`,
    // });

    return new StreamableFile(file)
  }

  @ApiOperation({ summary: 'Upload "file" ' })
  @ApiResponse({ status: 200 , description : 'File was successfully uploaded(Needs query path to selct a folder to save' })
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File , @Query() path ) 
  {
    return this.appService.uploadNewFile(file , path);
  }
  

  @ApiOperation({ summary: 'Create folder' })
  @ApiResponse({ status: 200 , description : 'Needs query param for path and /New Folder name' })
  
  @Post('createFolder')
  createNewFolder(@Query() path)
  {
    return this.appService.createNewFolder(path);
  }

  @ApiOperation({ summary: 'Delete folder or file' })
  @ApiResponse({ status: 200 , description : 'Needs query param for path and /New Folder name' })

  @Delete()
  deleteFileOrFolder(@Query() path)
  {
    return this.appService.deleteFileOrFolder(path)
  }

}
