import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.sass']
})
export class FileLoaderComponent implements OnInit {

  public file: any;
  public name: string;
  public loaded = false;
  public result: any;

  constructor(private http: Http) {
  }

  url = 'http://localhost:8080/calculation/new';

  getPredictedValuesFromExcel(json: Object): Observable<Response> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url, json, options);
  }

  setFile(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0],
      reader = new FileReader();
    if (file.type !== 'application/vnd.ms-excel' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      alert('invalid format');
      return;
    }

    this.loaded = false;
    this.name = e.target.files[0].name;
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.file = reader.result;
    this.loaded = true;
  }

  getPrediction() {
    let data = new Uint8Array(this.file);
    let workbook = XLSX.read(data, {type: 'array'});
    let first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    let worksheet = workbook.Sheets[first_sheet_name];
    let objectJSON = XLSX.utils.sheet_to_json(worksheet);

    for (let i = 0; i < objectJSON.length; i++) {
      // fill in the gdp property
      // paste gdp
      // remove unnesessary
      let gdpObj = {};
      gdpObj['year2012'] = objectJSON[i]['GDP_2012'];
      gdpObj['year2013'] = objectJSON[i]['GDP_2013'];
      gdpObj['year2014'] = objectJSON[i]['GDP_2014'];
      gdpObj['year2015'] = objectJSON[i]['GDP_2015'];
      gdpObj['year2016'] = objectJSON[i]['GDP_2016'];

      objectJSON[i]['gdp'] = gdpObj;

      objectJSON[i]['nuclear'] = (objectJSON[i]['nuclear'] == 0) ? false : true;
      objectJSON[i]['inWar'] = (objectJSON[i]['inWar'] == 0) ? false : true;

      delete objectJSON[i]['GDP_2012'];
      delete objectJSON[i]['GDP_2013'];
      delete objectJSON[i]['GDP_2014'];
      delete objectJSON[i]['GDP_2015'];
      delete objectJSON[i]['GDP_2016'];
    }
    this.getPredictedValuesFromExcel(objectJSON).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      this.result = JSON.parse(resJSON._body);
    });

  }

  ngOnInit() {
  }

}
