import { BaseEntity } from "src/base/base.entity";
import { User } from "src/user/user.model";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('data')
export class Data extends BaseEntity{

    @Column({name:"title",type:"varchar"})
    title:string;

    @Column({name:"value",type:"varchar"})
    Value:string;
 
    @ManyToOne(()=>User,(user)=>user.id)
    createdBy:User
}