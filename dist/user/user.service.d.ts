import { User } from './user.model';
import { Repository } from 'typeorm';
import { UserDetails } from './interfaces/user.interface';
import { SignupDto } from 'src/auth/dto/SignupDto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(data: SignupDto): Promise<User>;
    getUser(email: string): Promise<UserDetails>;
    getUserById(id: string): Promise<User | null>;
    getallUsers(): Promise<UserDetails[]>;
    activateUser(id: string): Promise<UserDetails>;
    deactivateUser(id: string): Promise<UserDetails>;
    getUserDetails(user: User): {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
