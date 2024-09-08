import { OnModuleInit } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
export declare class SeedService implements OnModuleInit {
    private userRepostiry;
    constructor(userRepostiry: Repository<User>);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
