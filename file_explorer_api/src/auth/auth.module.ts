import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { secret_key } from './Secret_key';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [
    JwtModule.register({
      secret: secret_key.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ]
  

})
export class AuthModule {}
