import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
import { ProductServiceService } from '../../services/product-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products!: Product[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private ProductServiceService: ProductServiceService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
      this.ProductServiceService.getProducts().then(data => this.products = data);

      this.sortOptions = [
          {label: 'Price High to Low', value: '!price'},
          {label: 'Price Low to High', value: 'price'}
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
