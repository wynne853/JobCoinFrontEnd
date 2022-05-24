import { Component, OnInit } from '@angular/core';
import { CredentialService } from '../credential.service';
@Component({
  selector: 'app-my-area',
  templateUrl: './my-area.component.html',
  styleUrls: ['./my-area.component.css']
})
export class MyAreaComponent implements OnInit {

  isEmployee!:boolean;

  constructor(private CredentialServiceInstance:CredentialService) { 
    this.isEmployee = this.CredentialServiceInstance.getAuthentication().userInformation.role === "Empregado";
  }

  ngOnInit(): void {
  }

}
