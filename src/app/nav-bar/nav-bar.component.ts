import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CredentialService } from '../credential.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public authenticationStatus?:boolean;
  
  public displayDialogLogin:boolean = false;
  public displayDialogCalculator:boolean = false; 

  public changeShowDialogCalculator(status:boolean) {
    this.displayDialogCalculator = status;
  }
  
  public changeShowDialogLogin(status:boolean) {
    this.displayDialogLogin = status;
  }

  public changeAuthenticationStatus(newAuthenticationStatus:boolean){
    this.authenticationStatus = newAuthenticationStatus;
  }

  constructor(private CredentialServiceInstance:CredentialService) {
    this.authenticationStatus = this.CredentialServiceInstance.getAuthenticationStatus();
  }
  
  ngOnInit() {
  }

}
