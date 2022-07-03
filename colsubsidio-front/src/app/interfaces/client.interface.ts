import { IAccount } from "./account.interface";

export interface IClient{
    id?:number;
    firstName:string;
    lastName:string;
    phone:number;
    address:string;
    password?:string;
    passwordConfirmed?:string;
    photo?:string;
    account?: IAccount[];
    
}