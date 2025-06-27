import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

@Entity({ name: 'tb_departamentos' })
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 60, nullable: false })
  descricao: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.departamento)
  funcionario: Funcionario[];
}
