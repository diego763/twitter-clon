import { IsString } from 'class-validator';
import { User } from 'src/module/users/entities';

export class CreateTuitDto {
  @IsString()
  readonly message: string;

  readonly user: Partial<User>; //partial para indicar que no es necesario tener todas las propiedades del usuario para crear un tuit
}
