import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoController } from './controllers/departamento.controller';
import { Departamento } from './entities/departamento.entity';
import { DepartamentoService } from './services/departamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  providers: [DepartamentoService],
  controllers: [DepartamentoController],
  exports: [DepartamentoService],
})
export class DepartamentoModule {}
