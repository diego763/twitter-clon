import { Injectable, NotFoundException } from '@nestjs/common';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
  private tuits: Tuit[] = [
    {
      id: '1',
      message: 'Hello, this is a message',
    },
  ];

  all(): Tuit[] {
    return this.tuits;
  }

  get(id: string): Tuit {
    const tuit = this.tuits.find((item) => item.id === id);
    if (!tuit) {
      throw new NotFoundException('No se encontro el tuit');
    }
    return tuit;
  }

  create(message: string): void {
    this.tuits.push({
      id: (Math.floor(Math.random() * 2000) + 1).toString(),
      message,
    });
  }

  update(id: string, message: string): Tuit {
    const tuit = this.get(id);
    tuit.message = message;
    return tuit;
  }

  delete(id: string): void {
    const index = this.tuits.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.tuits.splice(index, 1);
    }
  }
}
