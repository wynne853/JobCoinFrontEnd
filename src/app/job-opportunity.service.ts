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
  private URLJobOpportunity = `${environment.host}/v1/vagas`;

  constructor(private CredentialServiceInstance:CredentialService) {}
  
  private getToken(){
    return `Bearer ${this.CredentialServiceInstance.getToken()}`;
  }

  newJobOpportunity(title:string,description:string,salaryInDollar:number){
    return axios.post(this.URLJobOpportunity,{"valorVaga":salaryInDollar,"nomeVaga":title,"descricaoVaga":description},{headers:{ "Authorization":this.getToken() }});
  }

  deleteJobOpportunity(id:string){
    return axios.delete(`${this.URLJobOpportunity}/${id}` ,{
      headers:{
        "Authorization": this.getToken()
      }
   });
  }
  
  getJobOpportunity(filterDescription:string = "",filterValueBiggerThan:number = 0,filterValueLessThan:number = 0,page:number){
    return axios.get(this.URLJobOpportunity,{ 
      params: { 
        "numeroItens": JobOpportunityService.maxAnswerRowNumber,
        "palavraChave":filterDescription,
        "valorMaiorQue":filterValueBiggerThan,
        "valorMenorQue":filterValueLessThan,
        "pagina":page  
      },
      headers:{
        "Authorization": this.getToken()
      }
   });
  }

  getMyJobOpportunity(filterDescription:string = "",filterValueBiggerThan:number = 0,filterValueLessThan:number = 0,page:number){
    return axios.get(this.URLMyJobsList + this.CredentialServiceInstance.getUserId(),{ 
      params: { 
        "numeroItens": JobOpportunityService.maxAnswerRowNumber,
        "palavraChave":filterDescription,
        "valorMaiorQue":filterValueBiggerThan,
        "valorMenorQue":filterValueLessThan,
        "pagina":page  
      },
      headers:{
        "Authorization": this.getToken()
      }
   });
  }
  
  getMyfavoriteJobOpportunity(filterDescription:string = "",filterValueBiggerThan:number = 0,filterValueLessThan:number = 0,page:number){
    return axios.get(this.URLFavoriteJobsList + this.CredentialServiceInstance.getUserId(),{ 
      params: { 
        "numeroItens": JobOpportunityService.maxAnswerRowNumber,
        "palavraChave":filterDescription,
        "valorMaiorQue":filterValueBiggerThan,
        "valorMenorQue":filterValueLessThan,
        "pagina":page 
      },
      headers:{
        "Authorization": this.getToken()
      }
    });
  }

  favoriteJobOpportunity(idJobOpportunity:number){
    return axios.post(`${environment.host}/v1/vagas/${idJobOpportunity}/favoritar`,{},{headers:{ "Authorization":this.getToken() }});
  }

  disfavorJobOpportunity(idJobOpportunity:number){
    return axios.delete(`${environment.host}/v1/vagas/${idJobOpportunity}/desfavoritar`,{ 
      params: {},
      headers:{
        "Authorization": this.getToken()
      }
    });
  }

}
