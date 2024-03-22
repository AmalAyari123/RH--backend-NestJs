import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    title : String ; 
    @Column()
    description : String ; 

    @Column()
    status : TaskStatus ; 
    
    

}