import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    jwtService: JwtService;
    constructor(authService: AuthService);
    getAllUsers(): {};
    getUserByID(userDto: any): any;
}
