import { SignupDto } from './dto/SignupDto';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        expiresAt: number;
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
    testProtected(req: Request): Promise<string>;
}
