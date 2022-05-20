import { APP_ID, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';
import { Authenticate } from 'src/interfaces/Authenticate';
@Injectable({
  providedIn: 'root'
})

export class CredentialService {

  constructor() { }
  
  private URL = `${environment.host}/v1/login`;

  private authentication:Authenticate = { autenticado:false };


  async login(email:String,password:String){
    
    return axios.post(this.URL,{email,senha:password}).then(response => {
      this.authentication = response.data;
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
  
}
