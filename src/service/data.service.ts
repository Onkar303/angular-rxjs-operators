import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../model/beer';
import { Coffee } from '../model/coffee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  beerUrl = 'https://api.sampleapis.com/beers/ale';
  coffeeUrl = 'https://api.sampleapis.com/coffee/hot';
  constructor(private http: HttpClient) {}

  getBeer() {
    return this.http.get<Beer>(this.beerUrl);
  }

  getCoffee() {
    return this.http.get<Coffee>(this.coffeeUrl);
  }
}
