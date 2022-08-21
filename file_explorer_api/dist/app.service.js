"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const fs = require('fs');
const AllowedFolderPath_1 = require("./AllowedFolderPath");
let AppService = class AppService {
    getListOfFiles(path) {
        let AllFiles = [];
        if (fs.existsSync(`${AllowedFolderPath_1.AllowedPath}/${path.path}/`)) {
            fs.readdirSync(`${AllowedFolderPath_1.AllowedPath}/${path.path}`).forEach(file => {
                AllFiles.push(file);
            });
            console.log(AllFiles);
            return AllFiles;
        }
        else {
            fs.readdirSync(`${AllowedFolderPath_1.AllowedPath}`).forEach(file => {
                AllFiles.push(file);
            });
            console.log(AllFiles);
            return AllFiles;
        }
    }
    uploadNewFile(file, path) {
        if (path.path) {
            if (!fs.existsSync(`${AllowedFolderPath_1.AllowedPath}/${path.path}/${file.originalname}`)) {
                fs.writeFile(`${AllowedFolderPath_1.AllowedPath}/${path.path}/${file.originalname}`, file.buffer, function (err) {
                    if (err)
                        throw err;
                    console.log('File is created successfully.');
                });
                return { "response": "Successfully Uploaded" };
            }
        }
        else {
            if (!fs.existsSync(`${AllowedFolderPath_1.AllowedPath}/${file.originalname}`)) {
                fs.writeFile(`${AllowedFolderPath_1.AllowedPath}/${file.originalname}`, file.buffer, function (err) {
                    if (err)
                        throw err;
                    console.log('File is created successfully.');
                });
                return { "response": "Successfully Uploaded" };
            }
        }
    }
    createNewFolder(path) {
        if (!fs.existsSync(`${AllowedFolderPath_1.AllowedPath}/${path.path}/`))
            fs.mkdirSync(`${AllowedFolderPath_1.AllowedPath}/${path.path}/`);
    }
    deleteFileOrFolder(path) {
        if (fs.existsSync(`${AllowedFolderPath_1.AllowedPath}/${path.path}`))
            if (path.path.includes(".")) {
                (0, fs_1.unlink)(`${AllowedFolderPath_1.AllowedPath}/${path.path}`, (err) => {
                    if (err)
                        throw err;
                });
            }
            else {
                (0, fs_1.rmdir)(`${AllowedFolderPath_1.AllowedPath}/${path.path}/`, (err) => {
                    if (err)
                        throw err;
                });
            }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map