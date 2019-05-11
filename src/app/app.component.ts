import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(private translate: TranslateService, private titleService: Title) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.translate.get('APP.TITLE').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

}
