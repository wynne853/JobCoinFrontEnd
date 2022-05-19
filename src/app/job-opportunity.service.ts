import { Injectable } from '@angular/core';
import { JobOpportunity } from 'src/interfaces/JobOpportunity';

@Injectable({
  providedIn: 'root'
})
export class JobOpportunityService {
  
  private jobOpportunity:JobOpportunity ={
    uuid:"1",
    nomeVaga: "VAGA PARA JAVA",
    descricaoVaga: "É obrigatório saber JAVA",
    valorVaga: 10000
  } 

  public static maxAnswerRowNumber :number = 30;

  constructor() { 
    
  }

  getJobOpportunity(jobOpportunityDescription?:String):JobOpportunity[]{
    // request API
    return [this.jobOpportunity];
  }
  
}
