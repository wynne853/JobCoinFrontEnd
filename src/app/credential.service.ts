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

  private autentication:Authenticate = { autenticado:false };


  async login(email:String,password:String){
    
    return axios.post(this.URL,{email,senha:password}).then(response => {
      this.autentication = response.data;
      return this.autentication.autenticado;
    }).catch( error =>{
      this.autentication = { autenticado:false };
    });

  }

  getAutentication(){
    return this.autentication;
  }

  getAutenticationStatus(){
    return this.autentication.autenticado;
  }
  
}
