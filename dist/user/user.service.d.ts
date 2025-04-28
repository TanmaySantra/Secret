import { User } from './user.model';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    addUser(data: User): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
