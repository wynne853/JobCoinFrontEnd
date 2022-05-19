import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CredentialService } from '../credential.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loginStatus?:boolean;

  public displayDialogLogin:boolean = false;
  public displayDialogCalculator:boolean = false; 

  public changeShowDialogCalculator(status:boolean) {
    this.displayDialogCalculator = status;
  }
  
  public changeShowDialogLogin(status:boolean) {
    this.displayDialogLogin = status;
  }

  constructor(private CredentialServiceInstance:CredentialService) {
    this.loginStatus = this.CredentialServiceInstance.getAutenticationStatus();
  }

  ngOnInit() {
      
  }

}
