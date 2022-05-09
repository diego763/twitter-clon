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
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitService: TuitsService) {}

  @Get()
  getTuits(
    @Query() filterQuery: object,
    @Query() { limit, offset }: PaginationQueryDto,
  ): Promise<Tuit[]> {
    console.log(filterQuery); //parametros por query url string
    return this.tuitService.all({ limit, offset });
  }

  @Get(':id')
  getTuit(@Param('id') id: number): Promise<Tuit> {
    // @Param() param -> se puede recibir asi el objeto completo, para imprimir seria, "param.id"
    return this.tuitService.get(id);
  }

  @Post()
  createTuit(@Body() body: CreateTuitDto): Promise<Tuit> {
    // @Body('title') title: string -> se puede recuperar un solo valor o el objeto completo
    // console.log(body instanceof CreateTuitDto);
    console.log(body);
    return this.tuitService.create(body);
  }

  @Patch(':id')
  @Put(':id')
  updateTuit(
    @Param('id') id: number,
    @Body() body: UpdateTuitDto,
  ): Promise<Tuit> {
    return this.tuitService.update(id, body.message);
  }

  @Delete(':id')
  deleteTuit(@Param('id') id: number): Promise<void> {
    return this.tuitService.delete(id);
  }
}
