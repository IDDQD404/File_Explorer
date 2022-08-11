/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getListOfFilesInPahtFolder(path: any): any[];
    getFileByPath(path: any, res: any): StreamableFile;
    getFileStreamByPath(path: any, res: any): StreamableFile;
    uploadFile(file: Express.Multer.File, path: any): void;
}
