import { BaseEntity } from 'src/base/base.entity';
import { Data } from 'src/data/data.model';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    data: Data[];
}
