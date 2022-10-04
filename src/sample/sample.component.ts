import { Component, OnInit } from '@angular/core';
import { concat, merge, of } from 'rxjs';
import { first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
})
export class SampleComponent implements OnInit {
  constructor(private service: DataService) {}

  ngOnInit() {
    this.getMergerMap();
  }

  getData() {
    this.service
      .getBeer()
      .pipe(
        first(),
        map((beer) => {
          console.log({ beer: beer });
        }),
        switchMap(() => {
          return this.service.getCoffee();
        }),
        map((coffee) => {
          console.log({ Coffee: coffee });
        })
      )
      .subscribe();
  }

  getMoreData() {
    merge(this.service.getBeer(), this.service.getCoffee())
      .pipe(
        tap((response) => {
          debugger;
          console.log(response);
        })
      )
      .subscribe();
  }

  getConcatData() {
    concat(this.service.getBeer(), this.service.getCoffee())
      .pipe(
        tap((response) => {

          console.log(typeof response)
          console.log({ response: response });
        })
      )
      .subscribe();
  }

  ConcatMergeMapData(response){

    return this.service.getCoffee()
  }

  getMergerMap(){
    this.service.getBeer()
                .pipe(mergeMap((response)=> this.ConcatMergeMapData(response) ),
                  tap((response)=>{
                    console.log(response);
                  })
                
                )
                .subscribe((response)=>{

                  console.log(response);
                }
                )
                
  }
}
