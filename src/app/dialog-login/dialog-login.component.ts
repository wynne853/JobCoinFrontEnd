import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  @Input() displayDialogLogin!:boolean;
  @Output() changeShowDialogLogin = new EventEmitter<boolean>();

  closeDialog(){
    this.changeShowDialogLogin.emit(false);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
