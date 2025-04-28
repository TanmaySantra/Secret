import { UserService } from './user.service';
import { User } from './user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addUser(body: any): Promise<User>;
    getUsers(): Promise<User[]>;
    deleteUser(body: number): Promise<import("typeorm").DeleteResult>;
}
