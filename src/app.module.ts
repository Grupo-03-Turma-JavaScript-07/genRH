import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoModule } from './departamento/departamento.module';
import { Departamento } from './departamento/entities/departamento.entity';
import { Funcionario } from './funcionario/entities/funcionario.entity';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_genrh',
      entities: [Usuario, Funcionario, Departamento],
      synchronize: true,
    }),
    UsuarioModule,
    FuncionarioModule,
    DepartamentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
