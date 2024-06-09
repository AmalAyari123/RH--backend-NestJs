import { type } from "os";
import { Autorisation } from "src/autorisation/entities/autorisation.entity";
import DatabaseFile from "src/databaseFile.entity";
import { Demande } from "src/demande/entities/demande.entity";
import { Departement } from "src/departement/entities/departement.entity";
import { NotificationToken } from "src/notifications/entities/notification-token.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

 @PrimaryGeneratedColumn()
    id: number; 

  
    @Column({nullable:true})
    name :string;

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

    @Column({ nullable: true, type: 'float' })
    SoldeConge : number;
    @Column({ nullable: true, type: 'float' })
    Solde1 : number ;
    @Column({ nullable: true, type: 'float' })
    congeMaladie : number ;
    @Column({ nullable: true, type: 'float' })
    recuperation: number ;
   /* @Column({ type: 'varchar', length: 300, nullable: true })
    profilePic: string;*/

    @Column({nullable:true})
    DepartmentId : number ;
    @Column({nullable:true})
    userrole : String;
  @OneToMany(type => Demande , demande => demande.user , {eager : true})
   demandes : Demande[]; 

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(
    () => DatabaseFile,
    {
      nullable: true
    }
  )
  public avatar?: DatabaseFile;
 
  @Column({ nullable: true })
  public avatarId?: number;

   @OneToMany(type => Autorisation , autorisation => autorisation.user , {eager : true})
   autorisations : Autorisation[]; 
   @ManyToOne(type => Departement , departement => departement.users )
@JoinColumn({name : 'DepartmentId'})
   departement : Departement ; 

   @OneToMany(() => NotificationToken, notificationToken => notificationToken.user)
  notificationTokens: NotificationToken[];
   

    
    
}