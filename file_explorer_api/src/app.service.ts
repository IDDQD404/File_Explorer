import { Injectable, StreamableFile , Response as Res } from '@nestjs/common';
import { createReadStream } from 'fs';

const fs = require('fs');

import { AllowedPath } from './AllowedFolderPath'

@Injectable()
export class AppService {


  getListOfFiles(path)
  {
    // return body.path
    let AllFiles = []

    fs.readdirSync(`${AllowedPath}/${path.path}`).forEach(file => {
      //console.log(file);
      AllFiles.push(file)
    });

    console.log(AllFiles)

    return AllFiles
  }
  //
  uploadNewFile(file , path)
  {
    // return path

    //return(`${AllowedPath}/${path.path}/${file.originalname}`)

    fs.writeFile( `${AllowedPath}/${path.path}/${file.originalname}` , file.buffer , function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
    
  }
  //


}
