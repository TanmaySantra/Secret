import { SignupDto } from './dto/SignupDto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly userRepository;
    private readonly jwtService;
    constructor(userService: UserService, userRepository: Repository<User>, jwtService: JwtService);
    signup(data: SignupDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
    login(data: LoginDto): Promise<{
        token: string;
        expiresAt: number;
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
