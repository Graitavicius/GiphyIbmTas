import { DataService } from './../data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGifs();
    this.gifSubscription = this.dataService.getGifsAsObservable()
      .subscribe((res: any) => {
        this.gifs = res;
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.gifSubscription.unsubscribe();
  }

  expandGif(index) {
    this.clicked = !this.clicked;
    this.currentIndex = index;
  }

}
