import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Data } from "./data.model";
import { Repository } from "typeorm";
import { CreateDataDto} from "./dto/createDataDto";
import createHttpError from "http-errors";

@Injectable()
export class DataService{
    constructor(
        @InjectRepository(Data)
        private readonly secretRepo: Repository<Data>,
    ){} 
    async create(data:CreateDataDto):Promise<Data>{ 
        const secret =this.secretRepo.create(data);
        return await this.secretRepo.save(secret);
    }

    async getOne(id:string){ //get data from secret id 
        const find = await this.secretRepo.findOneBy({id})
        if(!find)
        {
            throw createHttpError("Data Not found");
        }
        return find;
    }   

    async getMany(id: string): Promise<Data[]> {
    const list = await this.secretRepo.find({ where: { id } });
    if (!list ) {
        throw createHttpError(404, "No data found for this user");
    }
    return list;
    }

    async updateData(){
                
    }
    //update
    //delete
}