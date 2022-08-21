import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { All_Users } from './All_users';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  jwtService : JwtService
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAllUsers()
  {
    return All_Users
  }

  @Post('login')
  getUserByID(@Body() userDto)
  {

    return this.authService.login(userDto)
    // delete user['userID']
    // delete user['password_hash']
    // return user
  }

//create delete update -- user



  /*
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  */
}
