import { BaseEntity } from "src/base/base.entity";
import { User } from "src/user/user.model";
export declare class Data extends BaseEntity {
    title: string;
    Value: string;
    createdBy: User;
}
