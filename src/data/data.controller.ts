import { Body, Controller, Post } from "@nestjs/common";
import { DataService } from "./data.service";
import { CreateDataDto} from "./dto/createDataDto";
import { Data } from "./data.model";

@Controller('secret')
export class DataController{
    constructor(private readonly dataService: DataService){}

    @Post('add')
    async secret(@Body() dataDto:CreateDataDto):Promise<Data>{
        console.log(dataDto)
        return await this.dataService.create(dataDto);
    }
}