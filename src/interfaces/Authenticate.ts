export interface Authenticate{
    token?:string;
    refreshToken?:String
    autenticado: boolean;
    dataCriacao?:string;
    dataExpiracao?:string;
    userInformation?:any;
}