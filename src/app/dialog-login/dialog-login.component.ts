import { CredentialService } from './../credential.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Authenticate } from 'src/interfaces/Authenticate';
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
  
  public userEmail:String = "";
  public userPassword:String = "";

  closeDialog(){
    this.changeShowDialogLogin.emit(false);
  }

  login(){
    this.CredentialServiceInstance.login(this.userEmail,this.userPassword).then(response =>{
      console.log(response);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
        // this.closeDialog();
      }).catch(error =>{
        this.messageService.add({severity:'error', summary: 'error', detail: 'Message Content'});
      });
  }

  constructor(private CredentialServiceInstance:CredentialService,private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
