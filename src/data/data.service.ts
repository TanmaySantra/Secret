import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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
      console.log("foundUser", secretData)
      const secret =this.secretRepo.create(secretData);
      return await this.secretRepo.save(secret);
    }

    async getOne(id:string, userId: string){ //get data from secret id
      const find = await this.secretRepo.findOne({where: {id}, relations: {
        createdBy: true
      }})
      if(!find)
      {
        throw new NotFoundException("Data Not found");
      }
      console.log(find.createdBy.id, userId)
      if(find.createdBy.id !== userId) {
        throw new ForbiddenException("User not allowed to do this task")
      }
      return ({
        ...find,
        createdBy: {
          id: find.createdBy.id,
          firstName: find.createdBy.firstName,
          lastName: find.createdBy.lastName,
          email: find.createdBy.email
        }
      });
     
    }   

    async getMany(id: string): Promise<Data[]> {
    const list = await this.secretRepo.find({ where: { id } });
    if (!list ) {
        throw createHttpError(404, "No data found for this user");
    }
    return list;
    }

    async getManyByUser(userId:string, page: number, take: number){
      const dataList = await this.secretRepo.find({
        take,
        skip: (page - 1) * take,
        where:{ 
          createdBy: { id: userId },
        }
      });
      const count = await this.secretRepo.count({where: {createdBy: {id: userId}}})
      return {
        data: dataList,
        count
      };                
    }

  // async updateData(id: string, dto:UpdateDataDto): Promise<Data> {
  //   const data = await this.secretRepo.findOneBy({ id });
  //   if (!data) throw createHttpError(404, 'No data found for this user');
  //   Object.assign(data, dto);
  //   return await this.secretRepo.save(data);
  // }
      
  // async deleteData(id: string): Promise<{ message: string }> {
  //   const result = await this.secretRepo.delete(id);
  //   if (result.affected === 0) {
  //     throw createHttpError(404, 'No data found for this user');
  //   }
  //   return { message: 'Data deleted successfully' };
  // }
}