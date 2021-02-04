import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  position = 0;
  input = '';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  search(inputValue: string) {
    if (inputValue !== '') {
      this.dataService.searchForGifs(inputValue, this.position);
      this.input = inputValue;
    }

  }

  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
    }
  }
}
