import { Component, OnInit } from '@angular/core';
import { CredentialService } from '../credential.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [MessageService]
})
export class RegisterUserComponent implements OnInit {

  constructor(private RouterInstance:Router,private CredentialServiceInstance:CredentialService,private MessageServiceInstance: MessageService) { }

  password!:string;
  accountType!:string;
  email!:string;
  name!:string;

  createNewUser(){
    this.CredentialServiceInstance.createNewUser(this.email,this.password,this.name,this.accountType).then(response =>{
      if(response.statusText === "ok"){
        this.MessageServiceInstance.add({severity:'success', summary: 'Sucesso', detail: 'Usuário cadastrado com sucesso'});
      }else{
        this.MessageServiceInstance.add({severity:'error', summary: 'Erro', detail: 'Erro cadastra novo usuário'});
      }
    }).catch(error =>{
      this.MessageServiceInstance.add({severity:'error', summary: 'Erro', detail: 'Erro cadastra novo usuário'});
    });
  }

  ngOnInit(): void {
    if(this.CredentialServiceInstance.getToken()){
      if(this.CredentialServiceInstance.isEmployer()){
        this.RouterInstance.navigate(["/minhaArea"]);
      }else{
        this.RouterInstance.navigate(["/busca"]);
      }
    }
  }

}
