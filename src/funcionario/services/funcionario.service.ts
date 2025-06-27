import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
// Precisa importar as classes


@Injectable()
export class funcionarioService {
  constructor(
    @InjectRepository(funcionario)
    private funcionarioRepository: Repository<funcionario>,
  ) {}

  async findAll(): Promise<funcionario[]> {
    return await this.funcionarioRepository.find();
  }

  async findById(id: number): Promise<funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!funcionario)
      throw new HttpException('Funcionario não encontrado', HttpStatus.NOT_FOUND);
    return funcionario;
  }

  async findAllByNome(nome: string): Promise<funcionario[]> {
    return await this.funcionarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(funcionario: funcionario): Promise<funcionario> {
    return await this.funcionarioRepository.save(funcionario);
  }

  async update(funcionario: funcionario): Promise<funcionario> {
    await this.findById(funcionario.id);
    return await this.funcionarioRepository.save(funcionario);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.funcionarioRepository.delete(id);
  }
}