import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, filter } from 'rxjs/operators';
import { Results } from 'src/app/models/results';
import { SearchItem } from 'src/app/models/search-item';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;
  showLoader = false;
  searchResults: SearchItem[];

  private destroySubject = new Subject();

  constructor(
    private fb: FormBuilder,
    private searchSrv: SearchService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.initFormListener();
  }

  initFormListener() {
    this.searchForm
      .get('search')
      .valueChanges.pipe(
        takeUntil(this.destroySubject),
        debounceTime(500),
      )
      .subscribe(val => {
          val.length >= 2 ? this.doSearch(val) : delete this.searchResults;
      });
  }

  doSearch(searchterm, numresults = 6) {
    this.showLoader = true;
    this.searchSrv.getSearchResults(numresults, searchterm).subscribe(
      (data) => {
        const results: Results = data.results;
        this.searchResults = results.docs;
      },
      (error) => {
        console.log(error);
      },
      () => this.showLoader = false);
  }

}
