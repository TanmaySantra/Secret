import { IsEmail, IsNotEmpty } from "class-validator";

export class SignupDto{

    id:number;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
}
