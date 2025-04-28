import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'firstname', type: 'varchar', length: 50 })
  firstname: string;

  @Column({ name: 'lastname', type: 'varchar', length: 50 })
  lastname: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 128 })
  password: string;
}
