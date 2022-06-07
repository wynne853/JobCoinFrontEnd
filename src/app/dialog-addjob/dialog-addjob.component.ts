import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobOpportunityService } from '../job-opportunity.service';

@Component({
  selector: 'app-dialog-addjob',
  templateUrl: './dialog-addjob.component.html',
  styleUrls: ['./dialog-addjob.component.css']
})
export class DialogADDJobComponent implements OnInit {

  constructor(private JobOpportunityServiceInstance:JobOpportunityService) { }

  public salaryInDollar!:number;
  public title!:string;
  public description!:string;

  @Input() displayDialogAddJob!:boolean;
  @Output() changeShowDialogAddJob= new EventEmitter<boolean>();
  
  ngOnInit(): void {
  }

  createNewJob(){
    this.JobOpportunityServiceInstance.newJobOpportunity(this.title,this.description,this.salaryInDollar).then(response =>{
      if(response.statusText === 'ok'){

        this.closeDialog();
      }else{

      }
    }).catch(error =>{
      
    });
  }

  closeDialog(){
    this.changeShowDialogAddJob.emit(false);
  }

}
