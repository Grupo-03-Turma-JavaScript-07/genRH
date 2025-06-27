import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 150, nullable: false })
  email: string;

  @Column({ length: 5000, nullable: true })
  foto: string;

  @IsNotEmpty()
  @Column({ length: 70, nullable: false })
  senha: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.usuario)
  funcionario: Funcionario[];
}
