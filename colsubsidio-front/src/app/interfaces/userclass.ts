import { IUser } from "./user.interface";

export class User implements IUser{
    id: number;
    username: string;
    password: string;
    fullname: string;
    roles: string[];

}