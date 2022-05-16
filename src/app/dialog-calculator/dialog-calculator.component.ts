import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-calculator',
  templateUrl: './dialog-calculator.component.html',
  styleUrls: ['./dialog-calculator.component.css']
})
export class DialogCalculatorComponent implements OnInit {


  @Input() public displayDialogCalculator!: boolean;
  @Output() changeShowDialogCalculator = new EventEmitter<boolean>();
  
  constructor() { }

  closeDialog(){
    this.changeShowDialogCalculator.emit(false);
  }

  ngOnInit(): void {
  }

}
