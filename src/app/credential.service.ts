import { APP_ID, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
import { Authenticate } from 'src/interfaces/Authenticate';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class CredentialService {

  constructor() { }
  
  private URL = `${environment.host}/v1/login`;

  private authentication:Authenticate = { autenticado:false };


  async login(email:String,password:String){
    
    return axios.post(this.URL,{email,senha:password}).then(response => {
      this.authentication = response.data.token;
      this.authentication.refreshToken = response.data.refreshToken;
      this.authentication.userInformation = this.getUserInformation(this.authentication.token!);
      console.log(this.authentication);
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

  private getUserInformation(tokenJWT:string):any{
    try {
      return jwt_decode(tokenJWT);
    } catch(Error) {
      return null;
    }
  }
  
}
