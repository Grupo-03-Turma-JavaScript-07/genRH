import { IsNotEmpty } from 'class-validator'; //pacote validation com seus decoradores (anotações?) para validação
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'; //pacote typeorm (biblioteca para conectar com o db)
import { Departamento } from '../../departamento/entities/departamento.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_funcionarios' }) //criando a tabela e seus atributos
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 11, nullable: false })
  salario: number;

  @IsNotEmpty()
  @Column({ length: 45, nullable: false })
  cpf: string;

  @IsNotEmpty()
  @Column({ length: 3, nullable: false })
  contrato: number;

  @ManyToOne(() => Departamento, (departamento) => departamento.funcionario, {
    onDelete: 'CASCADE',
  })
  departamento: Departamento;

  @ManyToOne(() => Usuario, (usuario) => usuario.funcionario, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
