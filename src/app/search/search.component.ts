import { JobOpportunity } from 'src/interfaces/JobOpportunity';
import { Component, Input, OnInit } from '@angular/core';
import {MessageService, PrimeNGConfig, SelectItem} from 'primeng/api';
import { JobOpportunityService } from '../job-opportunity.service';
import { CredentialService } from '../credential.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit {
    
    jobOpportunitys!: JobOpportunity[];
    displayDialogAddJob:boolean = false;
    authenticationStatus:boolean = false;
    maxAnswerRowNumber:number = JobOpportunityService.maxAnswerRowNumber;
    totalPages:number = 1;
    @Input() botaoAdicionar:boolean = false;
    // s - busca geral | f - busca as favoritas | m - busca minhas vagas
    @Input() searchType:string = "s";
    sortOptions!: SelectItem[];
    favoriteButton:boolean = false;
    filterValueBiggerThan!:number;
    filterValueLessThan!:number
    filterKeyWord!:string;
    sortOrder!: number;
    sortField!: string;
    displayDialogCalculator:boolean = false;
    salaryValue:number = 10;

    constructor(private RouterInstance:Router,private MessageServiceInstance: MessageService,private CredentialServiceInstance: CredentialService,private JobOpportunityServiceInstance: JobOpportunityService, private primengConfig: PrimeNGConfig) {}

    changeShowDialogCalculator(status:boolean,salaryValue:number = 0) {
      this.salaryValue = salaryValue;
      this.displayDialogCalculator = status;
    }


  ngOnInit() {
    this.authenticationStatus = this.CredentialServiceInstance.getAuthenticationStatus();
    this.search();
    this.showFavoriteButton();
      this.sortOptions = [
          {label: 'Maior Salário', value: '!valorVaga'},
          {label: 'Menor Salário', value: 'valorVaga'}
      ];

      this.primengConfig.ripple = true;
  }

  changeShowDialogAddJob(statusDialogAddJob:boolean){
      this.displayDialogAddJob = statusDialogAddJob;
  }



  private isStarFill(usuarioAtualFavoritouVaga:boolean){
    if(this.searchType === 'f'){
        return true;
    }else{
        return usuarioAtualFavoritouVaga;
    }
  }

    showFavoriteButton(){
        if(!this.authenticationStatus){
            this.favoriteButton = false;
        }else{
            switch (this.searchType) {
                case "f": 
                    this.favoriteButton = true;
                    break;
                case "m": 
                    this.favoriteButton = false;
                    break;
                default:
                    this.favoriteButton = true;
                    break;
            }
        }
    }



    selectIconFavoriteButton(usuarioAtualFavoritouVaga:boolean){
        

        return this.isStarFill(usuarioAtualFavoritouVaga) ?'pi pi-star-fill' : 'pi pi-star';
    }

  search(page:number = 1){
      switch (this.searchType) {
          case "f": 
                this.myFavoriteJobSearch(page);
            break;
          case "m": 
                this.myJobSearch(page);
            break;
          default: 
                this.generalSearch(page);
            break;
      }
  }

  generalSearch(page:number){
    this.JobOpportunityServiceInstance.getJobOpportunity(this.filterKeyWord,this.filterValueBiggerThan,this.filterValueLessThan,page).then(response =>{
        if(response.status === 200){
            
              this.jobOpportunitys = response.data.itensPagina;
              this.totalPages = response.data.numeroPaginas;
              
        }else{if(response.status === 204)
          this.jobOpportunitys = [];
        }
    }).catch(error =>{

    });
  }
  
  myJobSearch(page:number){
    this.JobOpportunityServiceInstance.getMyJobOpportunity(this.filterKeyWord,this.filterValueBiggerThan,this.filterValueLessThan,page).then(response =>{
        if(response.status === 200){
            
              this.jobOpportunitys = response.data.itensPagina;
              this.totalPages = response.data.numeroPaginas;
              
        }else if(response.status === 204){
          this.jobOpportunitys = [];
        }
    }).catch(error =>{

    });
  }
  
  myFavoriteJobSearch(page:number){
    this.JobOpportunityServiceInstance.getMyfavoriteJobOpportunity(this.filterKeyWord,this.filterValueBiggerThan,this.filterValueLessThan,page).then(response =>{
        
        if(response.status === 200){
            
              this.jobOpportunitys = response.data.itensPagina;
              this.totalPages = response.data.numeroPaginas;
              
        }else{if(response.status === 204)
          this.jobOpportunitys = [];
        }
    }).catch(error =>{

    });
  }

  private favoriteJobOpportunity(idJobOpportunity:number){
    this.JobOpportunityServiceInstance.favoriteJobOpportunity(idJobOpportunity).then(response =>{
        if(response.status === 200){
      }else{

      }
      this.search();
    }).catch(error =>{

    });
  }

  private disfavorJobOpportunity(idJobOpportunity:number){
    this.JobOpportunityServiceInstance.disfavorJobOpportunity(idJobOpportunity).then(response =>{
        if(response.status === 200){
      }else{

      }
      this.search();
    }).catch(error =>{

    });
  }

  toggleFavorite(idJobOpportunity:number,usuarioAtualFavoritouVaga:boolean = false){
      if(this.isStarFill(usuarioAtualFavoritouVaga)){
          this.disfavorJobOpportunity(idJobOpportunity);
      }else{
          this.favoriteJobOpportunity(idJobOpportunity);
      }
  }

  changePage(event:any){
      let page = event.page + 1 ;
      this.search(page);
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
