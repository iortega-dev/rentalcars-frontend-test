import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SearchItem } from 'src/app/models/search-item';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {

  isValid: boolean;
  @Input() item: SearchItem;
  @Input() keyword: string;
  PlaceTypes = PlaceTypes;

  @HostBinding('class.valid')
  public get isValidResult(): boolean {
    return !!(this.item.bookingId && this.item.placeKey);
  }

  constructor() { }

  ngOnInit() { }

  renderName(sItem: SearchItem) {
    if (sItem.name.includes(this.keyword)) {
      return '<b>' + this.keyword + '</b>' + sItem.name.split(this.keyword).join('');
    }
    return sItem.name;
  }

  renderPlacement(sItem: SearchItem) {
    const contentArray = this.placementContent(sItem).filter(Boolean);
    return contentArray.join(',');
  }

  placementContent(sItem: SearchItem) {
    switch (sItem.placeType) {
      case 'A': // Airport
        return [sItem.city, sItem.country];
      case 'C': // City
      case 'D': // District
        return [sItem.region, sItem.country];
      case 'G': // Other
      case 'W': // Country
        return [];
      case 'L': // Area
      case 'P': // Region
      case 'F': // Region
      case 'Z': // Place
        return [sItem.country];
      case 'S': // Station
      case 'T': // Station
        return [sItem.city, sItem.region, sItem.country];
    }
  }
}

enum PlaceTypes {
  A = 'Airport',
  C = 'City',
  D = 'District',
  G = 'Other',
  W = 'Country',
  L = 'Area',
  P = 'Region',
  F = 'Region',
  S = 'Station',
  T = 'Station',
  Z = 'Place'
}
