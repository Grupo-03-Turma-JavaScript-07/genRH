import {Body, Controller,Delete, Get, HttpCode, HttpStatus,Param,ParseIntPipe,Post,Put,} from '@nestjs/common';
// precisa importar as classes

@Controller('/funcionario')
export class funcionarioController {
  constructor(private readonly funcionarioService: funcionarioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<funcionario[]> {
    return this.funcionarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<funcionario> {
    return this.funcionarioService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome (@Param('nome') nome: string): Promise<funcionario[]> {
    return this.funcionarioService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() funcionario: funcionario): Promise<funcionario> {
    return this.funcionarioService.create(funcionario);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  Update(@Body() funcionario: funcionario): Promise<funcionario> {
    return this.funcionarioService.Update(funcionario);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.funcionarioService.delete(id);
  }
}