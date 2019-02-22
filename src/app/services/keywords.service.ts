import {Injectable} from '@angular/core';
import {Keyword} from '../models/keyword.model';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  private _topKeywords: Keyword[] = [];

  constructor(private httpClient: HttpClient) {
  }

  public initTopKeywords() {
    this.httpClient.get<Keyword[]>(environment.apiUrl + '/keywords/top')
      .subscribe(value => this._topKeywords = value);
  }

  get topKeyWords(): Keyword[] {
    return this._topKeywords;
  }
}
