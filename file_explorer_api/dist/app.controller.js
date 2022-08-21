"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const AllowedFolderPath_1 = require("./AllowedFolderPath");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getListOfFilesInPahtFolder(path) {
        return this.appService.getListOfFiles(path);
    }
    getFileByPath(path, res) {
        const file = (0, fs_1.createReadStream)(`${AllowedFolderPath_1.AllowedPath}/${path.path}`);
        let fullPath = (path.path.split("/"));
        let fileName = fullPath[fullPath.length - 1];
        res.set({
            'Content-Type': fileName.split(".")[1],
            'Content-Disposition': `attachment; filename = ${fileName}`,
        });
        return new common_1.StreamableFile(file);
    }
    getFileStreamByPath(path, res) {
        const file = (0, fs_1.createReadStream)(`${AllowedFolderPath_1.AllowedPath}/${path.path}`);
        let fullPath = (path.path.split("/"));
        let fileName = fullPath[fullPath.length - 1];
        return new common_1.StreamableFile(file);
    }
    uploadFile(file, path) {
        return this.appService.uploadNewFile(file, path);
    }
    createNewFolder(path) {
        return this.appService.createNewFolder(path);
    }
    deleteFileOrFolder(path) {
        return this.appService.deleteFileOrFolder(path);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get List of Files in Folder by path' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Needs query param for path' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getListOfFilesInPahtFolder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Downloads file by path' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Needs query param for path' }),
    (0, common_1.Get)('downloadFile'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFileByPath", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Stream of Video File ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Needs query param for path' }),
    (0, common_1.Get)('streamVideo'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFileStreamByPath", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload "file" ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File was successfully uploaded(Needs query path to selct a folder to save' }),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create folder' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Needs query param for path and /New Folder name' }),
    (0, common_1.Post)('createFolder'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createNewFolder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete folder or file' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Needs query param for path and /New Folder name' }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteFileOrFolder", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('Intearction with FIles and Folders'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map