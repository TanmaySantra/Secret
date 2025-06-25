import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Data } from "./data.model";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";
import { User } from "src/user/user.model";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([Data,User])],
    controllers:[DataController],
    providers:[DataService,UserService,JwtService],
})
export class DataModule{}