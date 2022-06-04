import { APP_ID, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
import { Authenticate } from 'src/interfaces/Authenticate';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class CredentialService {

  constructor() {}
  
  private URLLogin = `${environment.host}/v1/login`;
  private URLCreateNewUser = `${environment.host}/v1/usuarios`;

  private authentication:Authenticate = { autenticado:false };

  loadCreddential(){
    let stringAutentication = localStorage.getItem("autentication");
    if(stringAutentication){
      this.authentication = JSON.parse(stringAutentication);
      console.log(this.authentication)
    }
  }

  login(email:String,password:String){
    
    return axios.post(this.URLLogin,{email,senha:password}).then(response => {
      this.authentication = response.data.token;
      this.authentication.refreshToken = response.data.refreshToken;
      this.authentication.userInformation = this.getUserInformation(this.authentication.token!);
      localStorage.setItem('autentication', JSON.stringify(this.authentication));
      return this.authentication.autenticado;
    }).catch( error =>{
      this.authentication = { autenticado:false };
    });

  }

  getAuthentication(){
    return this.authentication;
  }

  getAuthenticationStatus(){
    return this.authentication.autenticado;
  }

  getToken(){
    return this.authentication.token;
  }
  
  getUserId(){
    return this.authentication.userInformation?.nameid;
  }

  private getUserInformation(tokenJWT:string):any{
    try {
      return jwt_decode(tokenJWT);
    } catch(Error) {
      return null;
    }
  }

  createNewUser(email:string,password:string,name:string,accountType:string){
    return axios.post(this.URLCreateNewUser,{email,senha:password,nome:name,idPerfil:accountType});
  }

  refreshToken(){

  }

  logout(){
    this.authentication = { autenticado:false };
    localStorage.removeItem("autentication");
  }
  
}
