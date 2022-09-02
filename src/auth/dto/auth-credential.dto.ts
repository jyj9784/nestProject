import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @ApiProperty({
        required: true,
        example: 'test0@email.com',
        description: '이메일',
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches( /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/, {
        message: '이메일 형식이 아닙니다.'
    })
    email: string;


    @ApiProperty({
        required: true,
        example: '테스트',
        description: '유저네임',
    })
    @IsString()
    @MinLength(2)
    @MaxLength(6)
    username: string;

    @ApiProperty({
        required: true,
        example: 'test1234',
        description: '패스워드',
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '패스워드는 알파벳 또는 숫자만 입력해주세요.(4자 이상, 20자 이하)'
    })
    password: string;
}