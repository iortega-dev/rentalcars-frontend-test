import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = 'https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do';

  constructor(private http: HttpClient) { }

  getSearchResults(numresults: number, searchterm: string): Observable<any> {
    const params = new HttpParams()
      .set('solrIndex', 'fts_en')
      .set('solrRows', numresults.toString())
      .set('solrTerm', searchterm);

    return this.http.get<any>(this.baseUrl, {params});
  }
}
