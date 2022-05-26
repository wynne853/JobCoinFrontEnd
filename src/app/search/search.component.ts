import { JobOpportunity } from 'src/interfaces/JobOpportunity';
import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
import { JobOpportunityService } from '../job-opportunity.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

    jobOpportunitys!: JobOpportunity[];
    maxAnswerRowNumber:number = JobOpportunityService.maxAnswerRowNumber;
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private JobOpportunityServiceInstance: JobOpportunityService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
      this.jobOpportunitys = this.JobOpportunityServiceInstance.getJobOpportunity();

      this.sortOptions = [
          {label: 'Maior Salário', value: '!valorVaga'},
          {label: 'Menor Salário', value: 'valorVaga'}
      ];

      this.primengConfig.ripple = true;
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
