import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDataDto{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    value:string;

    // @IsNotEmpty()
    // @IsUUID()
    // secretId:string;
}