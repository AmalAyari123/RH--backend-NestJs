import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Double, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DemandeStatus } from "../demande-status";
import DatabaseFile from "src/databaseFile.entity";

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

    @JoinColumn({ name: 'justificatifId' })
    @OneToOne(
      () => DatabaseFile,
      {
        nullable: true
      }
    )
    public justificatif?: DatabaseFile;

    @Column({ nullable: true })
  public justificatifId?: number;
 @ManyToOne(type => User , user => user.demandes,  { onDelete: 'CASCADE' }  )
 user : User;
 @JoinColumn({ name: 'userId' })


@Column({  nullable: true })
userId : number;


   

    
    
}