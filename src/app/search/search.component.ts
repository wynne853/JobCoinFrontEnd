import { JobOpportunity } from 'src/interfaces/JobOpportunity';
import { Component, Input, OnInit } from '@angular/core';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
import { JobOpportunityService } from '../job-opportunity.service';
import { CredentialService } from '../credential.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    
    jobOpportunitys!: JobOpportunity[];
    displayDialogAddJob:boolean = false;
    authenticationStatus:boolean = false;
    maxAnswerRowNumber:number = JobOpportunityService.maxAnswerRowNumber;
    @Input() botaoAdicionar:boolean = false;
    // s - busca geral | f - busca as favoritas | m - busca minhas vagas
    @Input() searchType:string = "s";
    sortOptions!: SelectItem[];
    filterValueBiggerThan!:number;
    filterValueLessThan!:number
    filterKeyWord!:string;
    sortOrder!: number;
    sortField!: string;

  constructor(private CredentialServiceInstance: CredentialService,private JobOpportunityServiceInstance: JobOpportunityService, private primengConfig: PrimeNGConfig) {

   }

  ngOnInit() {
    this.authenticationStatus = this.CredentialServiceInstance.getAuthenticationStatus();
    this.search();

      this.sortOptions = [
          {label: 'Maior Salário', value: '!valorVaga'},
          {label: 'Menor Salário', value: 'valorVaga'}
      ];

      this.primengConfig.ripple = true;
  }

  changeShowDialogAddJob(statusDialogAddJob:boolean){
      this.displayDialogAddJob = statusDialogAddJob;
  }

  search(){
      switch (this.searchType) {
          case "f": this.myFavoriteJobSearch();
              break;
          case "m": this.myJobSearch();
              break;
          default: this.generalSearch();
              break;
      }
  }

  generalSearch(){
    this.JobOpportunityServiceInstance.getJobOpportunity(this.filterKeyWord,this.filterValueBiggerThan,this.filterValueLessThan).then(response =>{
        console.log(response);
        if(response.status === 200){
              this.jobOpportunitys = response.data.itensPagina;
              console.log(this.jobOpportunitys)
        }else{

        }
    }).catch(error =>{

    });
  }
  
  myJobSearch(){
    this.JobOpportunityServiceInstance.getMyJobOpportunity(this.filterKeyWord,this.filterValueBiggerThan,this.filterValueLessThan).then(response =>{
        console.log(response);
        if(response.status === 200){
              this.jobOpportunitys = response.data.itensPagina;
              console.log(this.jobOpportunitys)
        }else{

        }
    }).catch(error =>{

    });
  }
  
  myFavoriteJobSearch(){
    this.JobOpportunityServiceInstance.getMyfavoriteJobOpportunity(this.filterKeyWord,this.filterValueBiggerThan,this.filterValueLessThan).then(response =>{
        
        if(response.status === 200){
              this.jobOpportunitys = response.data.itensPagina;
              console.log(this.jobOpportunitys)
        }else{

        }
    }).catch(error =>{

    });
  }

  favoriteJobOpportunity(idJobOpportunity:number){
    this.JobOpportunityServiceInstance.favoriteJobOpportunity(idJobOpportunity).then(response =>{
        if(response.status === 200){
            console.log(response.data)
      }else{

      }
    }).catch(error =>{

    });
  }

  disfavorJobOpportunity(idJobOpportunity:number){
    this.JobOpportunityServiceInstance.disfavorJobOpportunity(idJobOpportunity).then(response =>{
        if(response.status === 200){
            console.log(response.data)
      }else{

      }
    }).catch(error =>{

    });
  }

  onSortChange(event: { value: any; }) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

}
