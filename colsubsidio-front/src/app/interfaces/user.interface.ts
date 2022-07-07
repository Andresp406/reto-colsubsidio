export interface IUser{
    id?:number;
    username:string;
    password?:string;
    fullname?:string;
    roles?:string[];

}



export interface IResponseUser {
    access_token:  string;
    token_type:    string;
    refresh_token: string;
    expires_in:    number;
    scope:         string;
    stUserName:    string;
    stFullName:    string;
    jti:           string;
}
