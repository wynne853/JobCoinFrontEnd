import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CredentialService } from '../credential.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authenticationStatus?:boolean;
  userName?:String;
  displayDialogLogin:boolean = false;
  displayDialogCalculator:boolean = false;


  changeShowDialogCalculator(status:boolean) {
    this.displayDialogCalculator = status;
  }
  
  changeShowDialogLogin(status:boolean) {
    this.displayDialogLogin = status;
  }

  changeAuthenticationStatus(newAuthenticationStatus:boolean){
    this.authenticationStatus = newAuthenticationStatus;
    this.userName = this.CredentialServiceInstance.getAuthentication().userInformation.email;
  }

  constructor(private CredentialServiceInstance:CredentialService) {
    this.authenticationStatus = this.CredentialServiceInstance.getAuthenticationStatus();
  }
  
  ngOnInit() {
  }

}
