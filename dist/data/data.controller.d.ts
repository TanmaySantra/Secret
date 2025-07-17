import { DataService } from "./data.service";
import { CreateDataDto } from "./dto/createDataDto";
import { Data } from "./data.model";
export declare class DataController {
    private readonly dataService;
    constructor(dataService: DataService);
    getHealth(): Promise<string>;
    addData(dataDto: CreateDataDto, req: Request): Promise<Data>;
    getOneData(id: string, req: Request): Promise<{
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
    getAllData(page: number, take: number, req: Request): Promise<{
        data: Data[];
        count: number;
    }>;
}
