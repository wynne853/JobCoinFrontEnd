import { CredentialService } from './credential.service';
import { Injectable } from '@angular/core';
import { JobOpportunity } from 'src/interfaces/JobOpportunity';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JobOpportunityService {
  
  public static maxAnswerRowNumber :number = 6;
  private URLFavoriteJobsList = `${environment.host}/v1/vagas/favoritadas/`;
  private URLMyJobsList = `${environment.host}/v1/vagas/criadas/`;
  private URLJobsList = `${environment.host}/v1/vagas`;
  private URLNewJob = `${environment.host}/v1/vagas`;
  private requestToken:string;

  constructor(private CredentialServiceInstance:CredentialService) { 
    this.requestToken = `Bearer ${this.CredentialServiceInstance.getToken()}`;
  }
  
  private getToken(){
    this.CredentialServiceInstance.loadCreddential();
    this.requestToken = `Bearer ${this.CredentialServiceInstance.getToken()}`;
  }

  newJob(title:string,description:string,salaryInDollar:number){
    if(!this.requestToken){
      this.getToken();
    }
    return axios.post(this.URLNewJob,{"valorVaga":salaryInDollar,"nomeVaga":title,"descricaoVaga":description},{headers:{ "Authorization":this.requestToken }});
  }
  
  getJobOpportunity(filterDescription:string = "",filterValueBiggerThan:number = 0,filterValueLessThan:number = 0,page:number){
    if(!this.requestToken){
      this.getToken();
    }
    return axios.get(this.URLJobsList,{ 
      params: { 
        "numeroItens": JobOpportunityService.maxAnswerRowNumber,
        "palavraChave":filterDescription,
        "valorMaiorQue":filterValueBiggerThan,
        "valorMenorQue":filterValueLessThan,
        "pagina":page  
      },
      headers:{
        "Authorization": this.requestToken
      }
   });
  }

  getMyJobOpportunity(filterDescription:string = "",filterValueBiggerThan:number = 0,filterValueLessThan:number = 0,page:number){
    if(!this.requestToken){
      this.getToken();
    }
    return axios.get(this.URLMyJobsList + this.CredentialServiceInstance.getUserId(),{ 
      params: { 
        "numeroItens": JobOpportunityService.maxAnswerRowNumber,
        "palavraChave":filterDescription,
        "valorMaiorQue":filterValueBiggerThan,
        "valorMenorQue":filterValueLessThan,
        "pagina":page  
      },
      headers:{
        "Authorization": this.requestToken
      }
   });
  }
  
  getMyfavoriteJobOpportunity(filterDescription:string = "",filterValueBiggerThan:number = 0,filterValueLessThan:number = 0,page:number){
    if(!this.requestToken){
      this.getToken();
    }
    return axios.get(this.URLFavoriteJobsList + this.CredentialServiceInstance.getUserId(),{ 
      params: { 
        "numeroItens": JobOpportunityService.maxAnswerRowNumber,
        "palavraChave":filterDescription,
        "valorMaiorQue":filterValueBiggerThan,
        "valorMenorQue":filterValueLessThan,
        "pagina":page 
      },
      headers:{
        "Authorization": this.requestToken
      }
    });
  }

  favoriteJobOpportunity(idJobOpportunity:number){
    console.log(this.requestToken)
    console.log(idJobOpportunity)
    if(!this.requestToken){
      this.getToken();
    }
    return axios.post(`${environment.host}/v1/vagas/${idJobOpportunity}/favoritar`,{},{headers:{ "Authorization":this.requestToken }});
  }

  disfavorJobOpportunity(idJobOpportunity:number){
    if(!this.requestToken){
      this.getToken();
    }
    return axios.delete(`${environment.host}/v1/vagas/${idJobOpportunity}/desfavoritar`,{ 
      params: {},
      headers:{
        "Authorization": this.requestToken
      }
    });
  }

}
