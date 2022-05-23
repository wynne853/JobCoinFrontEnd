import { Injectable } from '@angular/core';
import axios from 'axios';
import INSS from '../assets/json/inss.json';
import IR from '../assets/json/ir.json';

@Injectable({
  providedIn: 'root'
})

export class SalaryCalculatorService {

  constructor() {}

  private currentDollarValue!:number;

  async getCurrencyDollarValue(){
    return await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL').then(response => {
      this.currentDollarValue = response.data.USDBRL.ask;
      return response.data.USDBRL.ask;
    }).catch(error => {
      console.log(error.message);
    });
  }

  grossSalaryInReal(salaryInDollar:number):number{
    return this.currentDollarValue * salaryInDollar;
  }

  private calculateINSS(grossSalaryInReal:number):any{
   
    if(INSS[INSS.length - 1].finalValue < grossSalaryInReal){
      grossSalaryInReal = INSS[INSS.length - 1].finalValue;
      return {
        percent: INSS[INSS.length - 1].percent,
        discountAmount:INSS[INSS.length - 1].percent * grossSalaryInReal
      }
    }else{
      for(let INSSRange of INSS){
        if(INSSRange.finalValue > grossSalaryInReal ){
          return {
            percent: INSSRange.percent,
            discountAmount:INSSRange.percent * grossSalaryInReal
          }
        }
      } 
    }

    return ;
  }
  
  private calculateIR(grossSalaryInReal:number):any{
    for(let IRRange of IR){
      if(IRRange.finalValue > grossSalaryInReal  || IRRange.finalValue === 0){
        return {
          percent: IRRange.percent,
          discountAmount:IRRange.percent * grossSalaryInReal
        };
      }
    } 
  }

  private rowTableINSS(grossSalaryInReal:number):any{
    
    let INSS = this.calculateINSS(grossSalaryInReal);
   
    return {
      description:"INSS",
      value:`R$ ${INSS.discountAmount}`,
      procent:`${INSS.percent * 100} %`
    };
  }
  
  private rowTableIR(grossSalaryInReal:number):any{

    let IR = this.calculateIR(grossSalaryInReal);

    return {
      description:"IR",
      value:`R$ ${IR.discountAmount}`,
      procent:`${IR.percent * 100}%`
    };
  }

  private rowTableGrossSalary(grossSalaryInReal:number):any{
    return {
      description:"Salário Bruto",
      value:`R$ ${grossSalaryInReal}`,
      procent:"-"
    };
  }
  
  private rowTableNetSalary(grossSalaryInReal:number,isINSS:boolean):any{
    let INSS = this.calculateINSS(grossSalaryInReal);
    let IR = this.calculateIR(grossSalaryInReal);
    return {
      description:"Salário líquido",
      value:`R$ ${isINSS ? grossSalaryInReal - IR.discountAmount - IR.discountAmount : grossSalaryInReal - IR.discountAmount}`,
      procent:"-"
    };
  }
  
  async calculateNetSalary(salaryInDollar:number,isINSS:boolean):Promise<any[]>{
    
    let tableSalary = [];
    
    if(!this.currentDollarValue){
      await this.getCurrencyDollarValue();
    }

    let grossSalaryInReal = this.grossSalaryInReal(salaryInDollar);
    
    tableSalary.push(this.rowTableGrossSalary(grossSalaryInReal));
    
    if(isINSS){
      tableSalary.push(this.rowTableINSS(grossSalaryInReal));
    }

    tableSalary.push(this.rowTableIR(grossSalaryInReal));
    
    tableSalary.push(this.rowTableNetSalary(grossSalaryInReal,isINSS));

    return tableSalary; 
  }


}
