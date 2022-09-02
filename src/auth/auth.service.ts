import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise <void>{
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const { email, password } = authcredentialsDto;
        const user = await this.userRepository.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
        // 유저 토큰 생성 (Secret + Payload)
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
        }
        else {
            throw new UnauthorizedException('로그인 실패')
        }
    }
}

