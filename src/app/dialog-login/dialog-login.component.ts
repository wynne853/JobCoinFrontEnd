import { CredentialService } from './../credential.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css'],
  providers: [MessageService]
})
export class DialogLoginComponent implements OnInit {

  @Input() displayDialogLogin!:boolean;
  @Output() changeShowDialogLogin = new EventEmitter<boolean>();
  @Output() changeAuthenticationStatus = new EventEmitter<boolean>();
  
  public spinnerLoading = false;
  public userEmail:String = "";
  public userPassword:String = "";

  closeDialog(){
    this.changeShowDialogLogin.emit(false);
  }
  
  login(){
    this.spinnerLoading = true;
    
    this.CredentialServiceInstance.login(this.userEmail,this.userPassword).then(response =>{
      
      this.spinnerLoading = false;
      if(this.CredentialServiceInstance.getAuthenticationStatus()){
        console.log(this.CredentialServiceInstance.getAuthentication());
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Logi Efetuado com sucesso'});
        this.changeAuthenticationStatus.emit(true);
        this.closeDialog();
      }else{
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao tentar Logar'});
      }
      
      });
  }

  constructor(private CredentialServiceInstance:CredentialService,private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
