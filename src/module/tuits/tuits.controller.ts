import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTuitDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitService: TuitsService) {}

  @Get()
  getTuits(@Query() filterQuery: object): Tuit[] {
    console.log(filterQuery); //parametros por query url string
    return this.tuitService.all();
  }

  @Get(':id')
  getTuit(@Param('id') id: string): Tuit {
    // @Param() param -> se puede recibir asi el objeto completo, para imprimir seria, "param.id"
    return this.tuitService.get(id);
  }

  @Post()
  createTuit(@Body() body: CreateTuitDto): void {
    // @Body('title') title: string -> se puede recuperar un solo valor o el objeto completo
    // console.log(body instanceof CreateTuitDto);
    return this.tuitService.create(body?.message);
  }

  @Patch(':id')
  //   @Put(':id')
  updateTuit(@Param('id') id: string, @Body() body: UpdateTuitDto): Tuit {
    return this.tuitService.update(id, body.message);
  }

  @Delete(':id')
  deleteTuit(@Param('id') id: string): void {
    return this.tuitService.delete(id);
  }
}
