import { Data } from "./data.model";
import { Repository } from "typeorm";
import { CreateDataDto } from "./dto/createDataDto";
import { UserDetails } from "src/user/interfaces/user.interface";
import { UserService } from "src/user/user.service";
export declare class DataService {
    private readonly secretRepo;
    private readonly userService;
    constructor(secretRepo: Repository<Data>, userService: UserService);
    create(data: CreateDataDto, user: UserDetails): Promise<Data>;
    getOne(id: string, userId: string): Promise<{
        createdBy: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
        title: string;
        Value: string;
        id: string;
        createdAt?: Date;
        updatedAt?: Date;
        active?: boolean;
    }>;
    getManyByUser(userId: string, page: number, take: number): Promise<{
        data: Data[];
        count: number;
    }>;
}
