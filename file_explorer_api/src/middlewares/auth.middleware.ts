import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secret_key } from 'src/auth/Secret_key';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Restricted request...');

    if(req.headers.authorization)
    {
      console.log( req.headers.authorization.split(' ')[1] )
      
      if( jwt.verify( req.headers.authorization.split(' ')[1] , secret_key.secret ) )
      {
        console.log('This token is valid')
        next();
      }

      else{
        res.send( { "error" : "Not valid token" } ) 
        console.log('Not valid token')
      }

    }

    else
    {

    }

  }
}
