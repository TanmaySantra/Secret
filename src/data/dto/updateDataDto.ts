import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateDataDto{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    value:string;
}