import { IAccount } from "./account.interface";

export interface IClient{
    id?:number;
    fullName:string;
    userName?:string;
    phone:number;
    address:string;
    password?:string;
    passwordConfirmed?:string;
    photo?:string;
    account?: IAccount[];
    
}