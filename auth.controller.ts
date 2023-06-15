import { Controller,Post,Body ,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}


    @Post('/signUp')
    signUp(
        @Body() signUpDto: SignUpDto): Promise<{ token: string}>   {
            return this.authService.signUP(signUpDto)
        } 
    @Get('/login')
    login(
         @Body() loginDto: LoginDto): Promise<{ token: string}>   {
                return this.authService.login(loginDto)
        } 
}

