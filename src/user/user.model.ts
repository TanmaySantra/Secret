import { BaseEntity } from 'src/base/base.entity';
import { Data } from 'src/data/data.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'firstname', type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'lastname', type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ name: 'email', type: 'varchar',nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 128,nullable: false })
  password: string;

  @OneToMany(() => Data, (ref) => ref.createdBy)
  data: Data[]
}
