import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { DataService } from "./data.service";
import { CreateDataDto} from "./dto/createDataDto";
import { Data } from "./data.model";
import { UpdateDataDto } from "./dto/updateDataDto";
import { AuthGuard } from "src/core/AuthGuard";

@Controller('secret')
export class DataController{
    constructor(private readonly dataService: DataService){}

    @Get('health')
    async getHealth(){
        return 'Running'
    }
    
    @UseGuards(AuthGuard)
    @Post('add')
    async addData(@Body() dataDto:CreateDataDto, @Request() req:Request):Promise<Data>{
        return await this.dataService.create(dataDto,req["user"]);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getOneData(@Query("id") id:string, @Request() req:Request)
    {
        return await this.dataService.getOne(id, req["user"].id)
    }

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllData(@Query("page") page:number, @Query("take") take:number, @Request() req:Request)
    {
        return await this.dataService.getManyByUser(req["user"].id, page, take)
    }
    
    // @UseGuards(AuthGuard)
    // @Patch(':id')
    // async updateData(@Param('id') id: string,@Body() updateDto: UpdateDataDto): Promise<Data> {
    // return await this.dataService.updateData(id, updateDto);
    // }

    // @UseGuards(AuthGuard)
    // @Delete(':id')
    // async deleteData(@Param('id') id: string): Promise<{ message: string }> {
    // return await this.dataService.deleteData(id);
    // }
}