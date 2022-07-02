export interface IAccount{
    id:number;
    accountNumber:number;
    balance:number;
    movement:IMovement[];
}

export interface IMovement{
    type:string;
    date:string;
    value:number;
}
