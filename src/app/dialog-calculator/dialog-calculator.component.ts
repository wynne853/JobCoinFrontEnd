import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { SalaryCalculatorService } from '../salary-calculator.service';
@Component({
  selector: 'app-dialog-calculator',
  templateUrl: './dialog-calculator.component.html',
  styleUrls: ['./dialog-calculator.component.css']
})
export class DialogCalculatorComponent implements OnInit {


  @Input() public displayDialogCalculator!: boolean;
  @Output() changeShowDialogCalculator = new EventEmitter<boolean>();

  public salaryInDollar!:number;
  public usingINSS = false;
  public dolarValue:String = "";

  public tableSalary:any[] =[];

  constructor(private SalaryCalculatorServiceInstance:SalaryCalculatorService) { 
    SalaryCalculatorServiceInstance.getCurrencyDollarValue().then(response =>{
      this.dolarValue = response;
    });
  }

  calculateNetSalary(){
    this.SalaryCalculatorServiceInstance.calculateNetSalary(this.salaryInDollar,this.usingINSS).then(response => {
      this.tableSalary = response;
    });
  }

  closeDialog(){
    this.changeShowDialogCalculator.emit(false);
  }

  ngOnInit(): void {
  }

}
