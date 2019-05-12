import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup;

  private destroySubject = new Subject();
  showLoader = false;

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
        filter(value => value.length >= 2)
      )
      .subscribe(val => {
          this.doSearch(val);
      });
  }

  doSearch(searchterm, numresults = 6) {
    this.showLoader = true;
    this.searchSrv.getSearchResults(numresults, searchterm).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => this.showLoader = false);
  }

}
