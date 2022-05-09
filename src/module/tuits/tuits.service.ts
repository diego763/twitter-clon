import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { CreateTuitDto, PaginationQueryDto } from './dto';

import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all({ limit, offset }: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async get(id: number): Promise<Tuit> {
    const tuit = await this.tuitRepository.findOne(id, { relations: ['user'] });
    if (!tuit) {
      throw new NotFoundException('No se encontro el tuit');
    }
    return tuit;
  }

  async create({ message, user }: CreateTuitDto): Promise<Tuit> {
    const tuit = this.tuitRepository.create({ message, user });
    return await this.tuitRepository.save(tuit);
  }

  async update(id: number, message: string): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.preload({
      id,
      message,
    });

    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }

    return await this.tuitRepository.save(tuit);
  }

  async delete(id: number): Promise<void> {
    const tuit = await this.get(id);
    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }
    await this.tuitRepository.remove(tuit);
  }
}
