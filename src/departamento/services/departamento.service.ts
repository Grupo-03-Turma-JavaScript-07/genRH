import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Departamento } from "../entities/departamento.entity";

@Injectable()
export class DepartamentoService {
constructor(
    @InjectRepository(Departamento)
    private DepartamentoRepository: Repository<Departamento>
    ) { }

async findAll(): Promise<Departamento[]> {
return await this.DepartamentoRepository.find({
relations: {
        funcionario: true
    }
    });
    }

async findById(id: number): Promise<Departamento> {

let departamento = await this.DepartamentoRepository.findOne({
    where: { id },
    relations: {
    funcionario: true
            }
        });

if (!departamento)
    throw new HttpException('Departamento não encontrado!', HttpStatus.NOT_FOUND);

    return departamento;
    }

async findAllByDescricao(descricao: string): Promise<Departamento[]> {
return await this.DepartamentoRepository.find({
    where: {
        descricao: ILike(`%${descricao}%`)
            },
        relations: {
                funcionario: true
            }
        })
    }

async create(departamento: Departamento): Promise<Departamento> {
return await this.DepartamentoRepository.save(departamento);
    }

async update(departamento: Departamento): Promise<Departamento> {

await this.findById(departamento.id);

return await this.DepartamentoRepository.save(departamento);
    }

async delete(id: number): Promise<DeleteResult> {

await this.findById(id);

return await this.DepartamentoRepository.delete(id);

    }

}