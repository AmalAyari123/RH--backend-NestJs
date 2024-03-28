import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

 @PrimaryGeneratedColumn()
    id: number; 

  
    @Column({nullable:true})
    name :String;

    @Column()
    email :string;

    @Column()
    password : string ;

    @Column({nullable:true})
    NumTel : number ;
    @Column({nullable:true})
    NumCIN : number ;

    @Column({nullable:true})
    CompanyGroup  : String ;

    @Column({nullable:true})
    SoldeConge : number;
    @Column({nullable:true})
    Solde1 : number ;
    @Column({ type: 'json', nullable: true })
    profilePic: any;
   

    
    
}