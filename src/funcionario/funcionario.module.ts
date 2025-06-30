import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioController } from './controllers/funcionario.controller';
import { Funcionario } from './entities/funcionario.entity';
import { FuncionarioService } from './services/funcionario.service';
import { DepartamentoModule } from '../departamento/departamento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario]), DepartamentoModule],
  providers: [FuncionarioService],
  controllers: [FuncionarioController],
  exports: [],
})
export class FuncionarioModule {}
