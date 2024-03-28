import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/mailer/mailer.service';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>,
        private emailService: EmailService,


    ){}

    async createUser(userData: {
        name:String
        email: string;
    
        NumTel: number;
        NumCIN: number;
        CompanyGroup: string;
        SoldeConge: number;
        Solde1: number;
    }): Promise<User> {
        const passwordLength = 6;
        const randomPassword = Math.random().toString(36).slice(-passwordLength);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';
        const user =  this.UserRepository.create({
            ...userData,
            profilePic: defaultProfilePicUrl,
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
    async updateUserName(id: number, newName: string): Promise<User> {
        const user = await this.getUserById(id);
        user.name = newName;
        return this.UserRepository.save(user);
    }
    async updateUserEmail(id: number, newEmail: string): Promise<User> {
        const user = await this.getUserById(id);
        user.email = newEmail;
        return this.UserRepository.save(user);
    }
    async updateUserNumTel(id: number, newNumTel: number): Promise<User> {
        const user = await this.getUserById(id);
        user.NumTel = newNumTel;
        return this.UserRepository.save(user);
    }
    async updateUserNumCIN(id: number, newNumCIN: number): Promise<User> {
        const user = await this.getUserById(id);
        user.NumCIN = newNumCIN;
        return this.UserRepository.save(user);
    }
    async updateUserSoldeConge(id: number, newSoldeConge: number): Promise<User> {
        const user = await this.getUserById(id);
        user.SoldeConge = newSoldeConge;
        return this.UserRepository.save(user);
    }
    async updateUserSolde(id: number, newSolde: number): Promise<User> {
        const user = await this.getUserById(id);
        user.Solde1 = newSolde;
        return this.UserRepository.save(user);
    }
    async updateProfilePic(id: number, profilePicUrl: string): Promise<User> {
        const user = await this.getUserById(id);
        user.profilePic = profilePicUrl;
        return this.UserRepository.save(user);
    }
    async findAll(): Promise<User[]> {
        return this.UserRepository.find();
      }


    

  
}
    

