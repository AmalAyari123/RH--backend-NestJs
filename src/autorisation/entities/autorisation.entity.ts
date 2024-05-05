import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autorisation extends BaseEntity{

 @PrimaryGeneratedColumn()
    id: number; 

  
    @Column({nullable:true})
     heure_debut :Date;

    @Column({nullable:true})
    heure_fin :Date;

    @Column({nullable:true})
    jour :Date;

    


    @Column()
    status: String ;
   
    



 @ManyToOne(type => User , user => user.demandes,  { onDelete: 'CASCADE' }  )
 user : User;
 @JoinColumn({ name: 'userId' })


@Column({  nullable: true })
userId : number;


   

    
    
}
