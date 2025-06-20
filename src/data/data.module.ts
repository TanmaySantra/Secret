import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Data } from "./data.model";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";
import { User } from "src/user/user.model";

@Module({
    imports:[TypeOrmModule.forFeature([Data,User])],
    controllers:[DataController],
    providers:[DataService],
})
export class DataModule{}