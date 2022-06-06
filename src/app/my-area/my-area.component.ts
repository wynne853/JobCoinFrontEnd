import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from '../credential.service';
@Component({
  selector: 'app-my-area',
  templateUrl: './my-area.component.html',
  styleUrls: ['./my-area.component.css']
})
export class MyAreaComponent implements OnInit {

  isEmployee!:boolean;

  constructor(private RouterInstance:Router,private CredentialServiceInstance:CredentialService) { 
    this.isEmployee = this.CredentialServiceInstance.getAuthentication()?.userInformation?.role === "Empregado";
    if(!this.CredentialServiceInstance.getAuthenticationStatus()){
      this.RouterInstance.navigate(["/busca"]);
    }
  }
  
  ngOnInit(): void {
    this.CredentialServiceInstance.loadCreddential();
    if(!this.CredentialServiceInstance.getAuthenticationStatus()){
      this.RouterInstance.navigate(["/busca"]);
    }
  }

}
