import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { All_Users } from './All_users';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  login(userDto)
  {
    let newToken
    All_Users.forEach(element => {
      if(element.username == userDto.username && element.password_hash == userDto.password)
      {
        console.log('This is user exist')
        newToken = { "access_token" : this.jwtService.sign(element) }
      }
    });

    return newToken
    
  }
}
