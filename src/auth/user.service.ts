import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { FindManyOptions, Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/mailer/mailer.service';
import { UserRepository } from './UserRepository';
import { Departement } from 'src/departement/entities/departement.entity';
import { DepartementService } from 'src/departement/departement.service';
import { Demande } from 'src/demande/entities/demande.entity';
import path from 'path';
import * as fs from 'fs';
import DatabaseFilesService from 'src/databaseFile.Service';
import { DemandeService } from 'src/demande/demande.service';
import { Cron } from '@nestjs/schedule';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private UserRepository: UserRepository,
       
        private emailService: EmailService,
        private demandeService: DemandeService,
        private readonly databaseFilesService: DatabaseFilesService,
        



    ){}

    async createUser(userData: {
        name:string
        email: string;
        userrole : String, 
    
        NumTel: number;
        NumCIN: number;
        CompanyGroup: string;
        SoldeConge: number;
        Solde1: number;
        recuperation:number;
       departmentId : number
    }): Promise<User> {
        const passwordLength = 6;
        const randomPassword = Math.random().toString(36).slice(-passwordLength);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
       /* const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';*/
       const congeMaladie = 4.0;
       
        const user =  this.UserRepository.create({
            ...userData,
            congeMaladie : congeMaladie,
          /*  profilePic: defaultProfilePicUrl,*/
            password: hashedPassword
        });
        const emailSubject = 'Your  Account Password';
        const emailText = `Your  password is: ${randomPassword}`;
        await this.emailService.sendEmail(userData.email, emailSubject, emailText);
        const savedUser = await this.UserRepository.save(user);

        return savedUser;
    }
    async getUserById(id: number): Promise<User> {
        const user = await this.UserRepository.findOne({ where: { id } } );
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async findOneByName(name: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { name } });
      }

    

    
    async getUserByName(name: string): Promise<User | null> {
        const user = await this.UserRepository.findOne({ where: { name } });
        return user || null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.UserRepository.findOne({ where: { email } });
        return user || null;
    }
    async deleteUser(id: number): Promise<void> {
   
        const user = await this.UserRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

       
        await this.UserRepository.delete(id);
    }

    async updateUser(id: number, updates: Partial<User>): Promise<User> {
        const user = await this.getUserById(id);
 
        Object.assign(user, updates);
        return this.UserRepository.save(user);
      }

      
    async findAll(): Promise<User[]> {

        return this.UserRepository.find({ relations: ['departement'] });
      }

   

      
      



   
    

     





     
     
      async deleteUserWithDemands(userId: number): Promise<void> {

        const user = await this.getUserById(userId);
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        await Promise.all(user.demandes.map(demande => demande.remove()));
    
        await this.UserRepository.remove(user);
      }
    
      async getUserByDepartement(DepartmentId: number): Promise<User | null> {
        const user = await this.UserRepository.findOne({ where: { DepartmentId } });
        return user || null;
    }

    @Cron('0 0 1 * *') // Runs at midnight on the first day of every month
    async compteurSolde(): Promise<void> {
      const users = await this.findAll();
      for (const user of users) {
        
          user.SoldeConge += 1.6;
          await this.UserRepository.save(user);
        
      }
    }

    async manualCompteurSolde(): Promise<void> {
      await this.compteurSolde();
    }

    async resetSoldeConge(): Promise<void> {
      const users = await this.findAll();
      for (const user of users) {
        if (user.SoldeConge !== null) {
          user.Solde1 = user.SoldeConge;
          user.SoldeConge = 0;
          user.congeMaladie = 4 ;
          await this.UserRepository.save(user);
        }
      }
    }
    async findOne(userId: number): Promise<User> {
      return this.UserRepository.findOne({
        where: { id: userId },
        relations: ['notificationTokens'],
      })
     }




    async calculateSolde(userId: number, demandeId: number): Promise<void> {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const demande = await this.demandeService.getDemandeById(demandeId);
      if (!demande) {
        throw new NotFoundException('Demande not found');
      }
  
      let remainingCount = 0;
  
      if (demande.type === 'Congés payés') {
        if (user.Solde1 !== null && user.Solde1 > 0) {
          if (user.Solde1 >= demande.count) {
            user.Solde1 -= demande.count;
          } else {
            remainingCount = demande.count - user.Solde1;
            user.Solde1 = 0;
          }
        } else {
          remainingCount += demande.count;
        }
      }
  
      if (remainingCount > 0) {
        user.SoldeConge -= remainingCount;
      }
  
      await this.UserRepository.save(user);
    }
  

      async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
        const avatar = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
        await this.UserRepository.update(userId, {
          avatarId: avatar.id
        });
        return avatar;
      }


      async deductSoldeMaladie(userId: number , demandeId:number): Promise<void> {
        const user = await this.getUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const demande = await this.demandeService.getDemandeById(demandeId);
        if (!demande) {
          throw new NotFoundException('Demande not found');
        }
    
      
            if (user.congeMaladie !== null && user.congeMaladie > 0) {
                if (user.congeMaladie >= demande.count) {
                    user.congeMaladie -= demande.count;
                }
            }
        
    
        // Save the updated user to the database
        await this.UserRepository.save(user);
    }
    async deductSoldeRec(userId: number , demandeId:number): Promise<void> {
      const user = await this.getUserById(userId);
      if (!user) {
          throw new NotFoundException('User not found');
      }
      const demande = await this.demandeService.getDemandeById(demandeId);
      if (!demande) {
        throw new NotFoundException('Demande not found');
      }
  
    
          if (user.recuperation !== null && user.recuperation > 0) {
              if (user.recuperation >= demande.count) {
                  user.recuperation -= demande.count;
              }
          }
      
  
      // Save the updated user to the database
      await this.UserRepository.save(user);
  }



    
    }
    
    
        
   
      



    

  

    

