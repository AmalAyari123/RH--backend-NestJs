import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

 @PrimaryGeneratedColumn()
    id: number; 

  
    @Column()
    name :String;

    @Column()
    email :string;

    @Column()
    password : string ;

    @Column()
    NumTel : number ;
    @Column()
    NumCIN : number ;

    @Column()
    CompanyGroup  : String ;

    @Column()
    SoldeConge : number;
    @Column()
    Solde1 : number ;
    @Column({ type: 'json', nullable: true })
    profilePic: any;
   

    
    
}