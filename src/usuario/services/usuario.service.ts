import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  private validarFoto(foto: string | undefined): void {
    if (!foto || foto.trim() === '') return;

    if (foto.length > 5000) {
      throw new HttpException(
        'O campo foto deve ter no máximo 5000 caracteres',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      new URL(foto);
    } catch (e) {
      throw new HttpException(
        'A foto deve ser uma URL válida',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllByUsuario(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        funcionario: true,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario nao encontrado!', HttpStatus.NOT_FOUND);
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        email,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario nao encontrado!', HttpStatus.NOT_FOUND);
    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    this.validarFoto(usuario.foto);
    const email = usuario.email;
    const validarEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (validarEmail)
      throw new HttpException('Usuario já existe!', HttpStatus.CONFLICT);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    this.validarFoto(usuario.foto);
    await this.findById(usuario.id);
    const email = usuario.email;
    const validarEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (validarEmail)
      throw new HttpException('Usuario já existe!', HttpStatus.CONFLICT);

    return await this.usuarioRepository.save(usuario);
  }

  async findAllByNome(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async delete(id: number): Promise<void> {
    const usuario = await this.findById(id);
    await this.usuarioRepository.delete(usuario.id);
  }
}
