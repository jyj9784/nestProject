import { Body, Controller, Post, Req, UseFilters, UseGuards,UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('auth')
@UseInterceptors(SuccessInterceptor)
@Controller('api/auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor( private authService: AuthService){}

    @ApiResponse({
        type: AuthCredentialsDto,
        status: 201,
        description: '회원가입 성공',
      })

    @ApiOperation({ summary: '회원가입' })
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authcredentialsDto);
    }

    @ApiResponse({
        type: AuthCredentialsDto,
        status: 201,
        description: '로그인 성공',
      })

    @ApiOperation({ summary: '로그인' })
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>  {
        return this.authService.signIn(authCredentialsDto);
    }

    
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User) {
    //     console.log('user', user);
    // } 

}