import { IsNotEmpty } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    id:number;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;
}