import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DataService } from "./data.service";
import { CreateDataDto} from "./dto/createDataDto";
import { Data } from "./data.model";
import { UpdateDataDto } from "./dto/updateDataDto";

@Controller('secret')
export class DataController{
    constructor(private readonly dataService: DataService){}

    @Post('add')
    async secret(@Body() dataDto:CreateDataDto):Promise<Data>{
        console.log(dataDto)
        return await this.dataService.create(dataDto);
    }

    @Get(':id')
    async getOneData(@Body() id:string):Promise<Data>
    {
        return await this.dataService.getOne(id)
    }

    @Get('user/:userId')
    async getUserData(@Body() userId:string)
    {
        return await this.dataService.getManyByUser(userId)
    }
    
    @Patch(':id')
    async updateData(
    @Param('id') id: string,
    @Body() updateDto: UpdateDataDto,
    ): Promise<Data> {
    return await this.dataService.updateData(id, updateDto);
    }

    @Delete(':id')
    async deleteData(@Param('id') id: string): Promise<{ message: string }> {
    return await this.dataService.deleteData(id);
    }
}