import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Funcionario } from '../entities/funcionario.entity';
import { DepartamentoService } from './../../departamento/services/departamento.service';
// Precisa importar as classes

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
    private DepartamentoService: DepartamentoService,
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find({
      relations: {
        departamento: true,
      },
    });
  }

  async findById(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        departamento: true,
      },
    });

    if (!funcionario)
      throw new HttpException(
        'Funcionario não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return funcionario;
  }

  async findAllByNome(nome: string): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        departamento: true,
      },
    });
  }

  async create(funcionario: Funcionario): Promise<Funcionario> {
    return await this.funcionarioRepository.save(funcionario);
  }

  async update(funcionario: Funcionario): Promise<Funcionario> {
    await this.findById(funcionario.id);
    return await this.funcionarioRepository.save(funcionario);
  }

  async aumentoSalario(id: number): Promise<Funcionario> {
    const funcionario = await this.findById(id);

    // funcionario.salario = Number(funcionario.salario);

    switch (funcionario.contrato) {
      case 1: // CLT
        funcionario.salario += funcionario.salario * 0.1;
        break;
      case 2: // PJ
        funcionario.salario += funcionario.salario * 0.2;
        break;
      case 3: // Estagiario
        funcionario.salario += funcionario.salario * 0;
        break;
      case 4: // Temporário
        funcionario.salario += funcionario.salario * 0.4;
        break;
    }

    return await this.funcionarioRepository.save(funcionario);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.funcionarioRepository.delete(id);
  }
}
