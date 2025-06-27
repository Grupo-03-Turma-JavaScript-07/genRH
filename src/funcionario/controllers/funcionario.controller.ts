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
import { Funcionario } from '../entities/funcionario.entity';
import { FuncionarioService } from '../services/funcionario.service';
// precisa importar as classes

@Controller('/funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Funcionario[]> {
    return this.funcionarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Funcionario> {
    return this.funcionarioService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Funcionario[]> {
    return this.funcionarioService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() funcionario: Funcionario): Promise<Funcionario> {
    return this.funcionarioService.create(funcionario);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  Update(@Body() funcionario: Funcionario): Promise<Funcionario> {
    return this.funcionarioService.update(funcionario);
  }

  // @Put('/:id')
  // @HttpCode(HttpStatus.OK)
  // aumentoSalario(@Param('id', ParseIntPipe) id: number): Promise<Funcionario> {
  //   return this.funcionarioService.aumentoSalario(id);
  // }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.funcionarioService.delete(id);
  }
}
