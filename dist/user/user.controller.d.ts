import { UserService } from './user.service';
import { User } from './user.model';
import { SignupDto } from './dto/user.SignupDto';
import { LoginDto } from './dto/user.LoginDto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(SignupDto: SignupDto): Promise<User>;
    login(LoginDto: LoginDto): Promise<User>;
    deleteUser(body: number): Promise<import("typeorm").DeleteResult>;
}
