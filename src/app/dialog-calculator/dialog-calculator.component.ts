import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-calculator',
  templateUrl: './dialog-calculator.component.html',
  styleUrls: ['./dialog-calculator.component.css']
})
export class DialogCalculatorComponent implements OnInit {


  @Input() public displayDialogCalculator!: boolean;
  @Output() changeShowDialogCalculator = new EventEmitter<boolean>();
  public salario!:number;
  public usingINSS!:boolean;
  public dolarValue:String = "4,97";

  public tables:any[] =[
    {
      description:"value",
      value:"R$ 10000",
      procent:"-"
    },{
      description:"INSS",
      value:"R$ 800",
      procent:"8%"
    },{
      description:"IR",
      value:"R$ 2750",
      procent:"27,5%"
    },{
      description:"Salário líquido",
      value:"R$ 6450",
      procent:"-"
    }];

  constructor() { }

  closeDialog(){
    this.changeShowDialogCalculator.emit(false);
  }

  ngOnInit(): void {
  }

}
