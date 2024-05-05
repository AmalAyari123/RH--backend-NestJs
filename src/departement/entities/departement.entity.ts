import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Departement extends BaseEntity{

 @PrimaryGeneratedColumn()
    id: number; 

  
    @Column({nullable:true})
    name :String;

  @OneToMany(type => User , user => user.departement )

    users : User[]; //country 


  
}
