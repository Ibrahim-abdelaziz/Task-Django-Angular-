import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  Categories = [{name: 'test'}];

  constructor(private api: ApiService) {
    this.getCategories(); // getAllCategories

  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        this.Categories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  




}
