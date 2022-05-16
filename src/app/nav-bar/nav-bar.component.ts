import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public login = false;

  public displayDialogLogin:boolean = false;
  public displayDialogCalculator:boolean = false; 

  public changeShowDialogCalculator(status:boolean) {
    this.displayDialogCalculator = status;
  }
  
  public changeShowDialogLogin(status:boolean) {
    this.displayDialogLogin = status;
  }

  ngOnInit() {
      
  }

}
