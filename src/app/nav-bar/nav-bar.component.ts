import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from '../credential.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authenticationStatus?:boolean;
  userName?:String;
  isEmployer:boolean = false; 
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
    this.userName = this.CredentialServiceInstance.getAuthentication().userInformation.given_name;
    this.isEmployer = this.CredentialServiceInstance.getAuthentication().userInformation.role === "Empregador";
    if(this.isEmployer){
      this.RouterInstance.navigate(["minhaArea"]);
    }
  }

  constructor(private RouterInstance:Router,private CredentialServiceInstance:CredentialService) {
  }

  logout(){
    this.CredentialServiceInstance.logout();
    this.authenticationStatus = false;
    this.userName = '';
    this.isEmployer = false; 
  }
  
  ngOnInit() {
    this.CredentialServiceInstance.loadCreddential();
    this.changeAuthenticationStatus(this.CredentialServiceInstance.getAuthenticationStatus());
  }

}
