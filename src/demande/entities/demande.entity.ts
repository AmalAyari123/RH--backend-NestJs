import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DemandeStatus } from "../demande-status";

@Entity()
export class Demande extends BaseEntity{

 @PrimaryGeneratedColumn()
    id: number; 

  
    @Column({nullable:true})
     date_debut :Date;

    @Column()
    date_fin :Date;

    @Column()
    status: String ;
    @Column()
    type: String ;

    @Column({nullable:true})
    repCommentaire: String ;
    @Column()
    commentaire: String ;

    @Column({ nullable: true, type: 'float' })
    count: number ;


  @Column({ type: 'json', nullable: true })
justificatif: any;
 @ManyToOne(type => User , user => user.demandes,  { onDelete: 'CASCADE' }  )
 user : User;
 @JoinColumn({ name: 'userId' })


@Column({  nullable: true })
userId : number;


   

    
    
}