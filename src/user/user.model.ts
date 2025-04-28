import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{ 
    @PrimaryGeneratedColumn("uuid")
    id:number

    @Column({name:"firstname",type:"varchar",length:50})
    firstname:string

    @Column({name:"lastname",type:"varchar",length:50})
    lastname:string 

    @Column({name:"email",type:"varchar"})
    email:string

    @Column({name:"password",type:"varchar",length:128})
    password:string
}