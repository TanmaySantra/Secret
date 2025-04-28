import { User } from './user.model';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/user.LoginDto';
import { SignupDto } from './dto/user.SignupDto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    signup(data: SignupDto): Promise<User>;
    login(data: LoginDto): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
