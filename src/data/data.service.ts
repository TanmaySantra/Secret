import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Data } from "./data.model";
import { Repository } from "typeorm";
import { CreateDataDto} from "./dto/createDataDto";
import createHttpError from "http-errors";
import { UpdateDataDto } from "./dto/updateDataDto";
import { UserDetails } from "src/user/interfaces/user.interface";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.model";

@Injectable()
export class DataService{
    constructor(
        @InjectRepository(Data)
        private readonly secretRepo: Repository<Data>,
        private readonly userService:UserService
    ){} 
    async create(data:CreateDataDto,user:UserDetails):Promise<Data>{  
      console.log(user)
      const foundUser=await this.userService.getUserById(user.id)      
      const secretData={
        createdBy:foundUser as User,
        title:data.title,
        Value:data.value
      }
        const secret =this.secretRepo.create(secretData);
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

    async getManyByUser(userId:string){
      const dataList = await this.secretRepo.find({where:{ createdBy: { id: userId } }
      });
      if (!dataList.length) {
        throw createHttpError(404, 'No data found for this user');
      }
      return dataList;                
    }

    async updateData(id: string, dto:UpdateDataDto): Promise<Data> {
    const data = await this.secretRepo.findOneBy({ id });
    if (!data) throw createHttpError(404, 'No data found for this user');
    Object.assign(data, dto);
    return await this.secretRepo.save(data);
  }
      
  async deleteData(id: string): Promise<{ message: string }> {
    const result = await this.secretRepo.delete(id);
    if (result.affected === 0) {
      throw createHttpError(404, 'No data found for this user');
    }
    return { message: 'Data deleted successfully' };
  }
}