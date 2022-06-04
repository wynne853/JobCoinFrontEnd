import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  
  private URLListAllJobs = `${environment.host}/v1/vagas`;
  private URLNewJob = `${environment.host}/v1/vagas`;
  
  constructor() { }

  newJob(salaryInDollar:number,title:string,description:string){
    return axios.post(this.URLNewJob,{"valorVaga":salaryInDollar,"nomeVaga":title,"descricaoVaga":description});
  }


}
