import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Departamento } from '../entities/departamento.entity';
import { DepartamentoService } from '../services/departamento.service';

@Controller('/departamentos')
export class DepartamentoController {
  constructor(private readonly DepartamentoService: DepartamentoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Departamento[]> {
    return this.DepartamentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Departamento> {
    return this.DepartamentoService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllBydescricao(
    @Param('descricao') descricao: string,
  ): Promise<Departamento[]> {
    return this.DepartamentoService.findAllByDescricao(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() departamento: Departamento): Promise<Departamento> {
    return this.DepartamentoService.create(departamento);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() departamento: Departamento): Promise<Departamento> {
    return this.DepartamentoService.update(departamento);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.DepartamentoService.delete(id);
  }
}
