import { Injectable, StreamableFile , Response as Res } from '@nestjs/common';
import { createReadStream, rmdir, rmdirSync, unlink, unlinkSync } from 'fs';

const fs = require('fs');

import { AllowedPath } from './AllowedFolderPath'

@Injectable()
export class AppService {


  getListOfFiles(path)
  {
    // return body.path
    let AllFiles = []

    if(fs.existsSync(`${AllowedPath}/${path.path}/`))
    {
      fs.readdirSync(`${AllowedPath}/${path.path}`).forEach(file => {
        //console.log(file);
        AllFiles.push(file)
      });

      console.log(AllFiles)

      return AllFiles
    }
    else
    {
      fs.readdirSync(`${AllowedPath}`).forEach(file => {
        //console.log(file);
        AllFiles.push(file)
      });

      console.log(AllFiles)

      return AllFiles
    }
  }
  //
  uploadNewFile(file , path)
  {
    // return path

    //return(`${AllowedPath}/${path.path}/${file.originalname}`)
    
    if(path.path)
    {
      if(!fs.existsSync(`${AllowedPath}/${path.path}/${file.originalname}`))
      { 
        fs.writeFile( `${AllowedPath}/${path.path}/${file.originalname}` , file.buffer , function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        })
        
        return { "response" : "Successfully Uploaded"}
      }
    }
    else
    {
      if(!fs.existsSync(`${AllowedPath}/${file.originalname}`))
      { 
        fs.writeFile( `${AllowedPath}/${file.originalname}` , file.buffer , function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        })
        
        return { "response" : "Successfully Uploaded"}
      }
    }

  }
  //
  createNewFolder(path)
  {
    if(!fs.existsSync(`${AllowedPath}/${path.path}/`))

    fs.mkdirSync(`${AllowedPath}/${path.path}/`);
  }
  //
  deleteFileOrFolder(path)
  {
    if(fs.existsSync(`${AllowedPath}/${path.path}`))
      if(path.path.includes("."))
      {
        unlink(`${AllowedPath}/${path.path}`, (err) => 
        {
          if (err) throw err;
        });
      }
      else
      {
        rmdir(`${AllowedPath}/${path.path}/`, (err) => 
        {
          if (err) throw err;
        });
      }
  }

}
