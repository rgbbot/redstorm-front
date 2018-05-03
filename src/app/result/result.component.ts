import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  @Input() data: any;
  public chosenCountry: any;

  selectCountry(countryName) {
    this.chosenCountry = this.data.find(_ => _.countryName === countryName);
  }
  constructor() { }

  ngOnInit() {
  }

}
