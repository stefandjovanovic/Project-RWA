import { Role } from "src/auth/enums/roles.enum";

export class UserInfoDto {
 id: string;
 username: string;
 role: Role;
}