import { Component, OnInit } from '@angular/core';
import { CredentialService } from '../credential.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [MessageService]
})
export class RegisterUserComponent implements OnInit {

  constructor(private CredentialServiceInstance:CredentialService,private messageService: MessageService) { }

  password!:string;
  accountType!:string;
  email!:string;
  name!:string;

  createNewUser(){
    this.CredentialServiceInstance.createNewUser(this.email,this.password,this.name,this.accountType).then(response =>{
      if(this.CredentialServiceInstance.getAuthenticationStatus()){
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Usuário cadastrado com sucesso'});
      }else{
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro cadastra novo usuário'});
      }
    }).catch(error =>{
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro cadastra novo usuário'});
    });
  }

  ngOnInit(): void {
  }

}
