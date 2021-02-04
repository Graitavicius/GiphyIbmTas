import { SearchComponent } from './../search/search.component';
import { DataService } from './../data.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as scroll from '../search/search.component';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit, OnDestroy {
  clicked = false;
  gifs: any[] = [];
  gifSubscription: Subscription;
  currentIndex;
  gifName = '';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGifs();
    this.gifSubscription = this.dataService.getGifsAsObservable()
      .subscribe((res: any) => {
        this.gifs = res;
      });
  }

  ngOnDestroy() {
    this.gifSubscription.unsubscribe();
  }

  expandGif(index) {
    this.clicked = !this.clicked;
    this.currentIndex = index;
  }

  closeGif() {
    this.clicked = !this.clicked;
  }

  scroll() {
    this.gifName = this.dataService.gifName;
    if (this.gifName == '') {
      this.dataService.scrollTrendingPage();
      this.dataService.getGifs();
    } else {
      this.dataService.scrollSearch();
    }
  }
}
