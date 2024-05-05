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


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private UserRepository: UserRepository,
       private  departmentservices :  DepartementService ,
       
        private emailService: EmailService,
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
       departmentId : number
    }): Promise<User> {
        const passwordLength = 6;
        const randomPassword = Math.random().toString(36).slice(-passwordLength);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
       /* const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';*/
  
       
        const user =  this.UserRepository.create({
            ...userData,
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


      /*async uploadProfilePicture(userId: number, file: Express.Multer.File): Promise<User> {
        const user = await this.getUserById(userId);
        if (!user) {
          throw new Error('User not found');
        }
    
        // Generate a unique file name (You may use other methods to ensure uniqueness)
        const fileName = `${userId}-${file.originalname}`;
    
        // Define the destination directory where the file will be saved
        const uploadDir = path.join(__dirname, '..', 'uploads');
    
        try {
          // Create the uploads directory if it doesn't exist
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
    
          // Define the destination path where the file will be saved
          const filePath = path.join(uploadDir, fileName);
    
          // Write the uploaded file to the destination path
          fs.writeFileSync(filePath, file.buffer);
    
          // Update the user's profilePic property with the file path
          user.profilePic = filePath;
    
          // Save the updated user to the database
          return await this.UserRepository.save(user);
        } catch (error) {
          // Handle any errors that occur during file saving
          throw new Error(`Error saving profile picture: ${error.message}`);
        }
      }*/
    
      



   
    

     





     
     
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

      async calculateSolde(userId: number): Promise<void> {
        const user = await this.getUserById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        let remainingCount = 0;
    
        user.demandes.forEach((demande: Demande) => {
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
        });
    
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




    
    }
    
    
        
   
      



    

  

    

