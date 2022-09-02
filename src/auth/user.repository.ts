import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email,  username, password } = authCredentialsDto;
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ email, username, password: hashedPassword });
        
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') { //데이터베이스 내 존재하는 경우 뜨는 에러코드
                throw new ConflictException('Existing email');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}