import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/auth/enums/roles.enum";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit{
    constructor(
        @InjectRepository(User)
        private userRepostiry: Repository<User>
    ) { }

    async onModuleInit(): Promise<void> {
        await this.seed();
    }

    async seed(): Promise<void> {
        const username = 'stefan-admin';
        const foundUser = await this.userRepostiry.findOneBy({username});
        if(foundUser){
            return;
        }
        const user = new User();
        user.username = username;
        const salt = await bcrypt.genSalt();
        user.salt = salt;
        user.password = await bcrypt.hash('Pa$$w0rd', salt);
        user.email = 'stefan@admin.com';
        user.firstName = 'Stefan';
        user.lastName = 'Jovanovic';
        user.address = 'Bulevar Nemanjica 38';
        user.role = Role.ADMIN;
        user.managerDetails = null;
        user.playerDetails = null;

        await this.userRepostiry.save(user);
        
    }
    
}