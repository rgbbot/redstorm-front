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
  // public result = [{
  //   'id': 707,
  //   'countryName': 'Afghanistan',
  //   'bayessTrue': 0.11909,
  //   'bayessFalse': 0.88091,
  //   'nnTrue': 0.4,
  //   'nnFalse': 0.6
  // }
  //   , {
  //     'id': 708,
  //     'countryName': 'Albania',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 709,
  //     'countryName': 'Algeria',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 710,
  //     'countryName': 'Angola',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 711,
  //     'countryName': 'Argentina',
  //     'bayessTrue': 0.063,
  //     'bayessFalse': 0.937,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 712,
  //     'countryName': 'Armenia',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 713,
  //     'countryName': 'Australia',
  //     'bayessTrue': 0.063,
  //     'bayessFalse': 0.937,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 714,
  //     'countryName': 'Austria',
  //     'bayessTrue': 0.06773,
  //     'bayessFalse': 0.93227,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 715,
  //     'countryName': 'Azerbaijan',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 716,
  //     'countryName': 'Bahrain',
  //     'bayessTrue': 0.063,
  //     'bayessFalse': 0.937,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 717,
  //     'countryName': 'Bangladesh',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 718,
  //     'countryName': 'Belarus',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 719,
  //     'countryName': 'Belgium',
  //     'bayessTrue': 0.06773,
  //     'bayessFalse': 0.93227,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 720,
  //     'countryName': 'Belize',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 721,
  //     'countryName': 'Benin',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 722,
  //     'countryName': 'Bhutan',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 723,
  //     'countryName': 'Bolivia',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 724,
  //     'countryName': 'Bosnia and Herzegovina',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 725,
  //     'countryName': 'Botswana',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 726,
  //     'countryName': 'Brazil',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 727,
  //     'countryName': 'Bulgaria',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 728,
  //     'countryName': 'Burkina Faso',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 729,
  //     'countryName': 'Burundi',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 730,
  //     'countryName': 'Cambodia',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 731,
  //     'countryName': 'Cameroon',
  //     'bayessTrue': 0.0695,
  //     'bayessFalse': 0.9305,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 732,
  //     'countryName': 'Canada',
  //     'bayessTrue': 0.06773,
  //     'bayessFalse': 0.93227,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 733,
  //     'countryName': 'Chad',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 734,
  //     'countryName': 'Chile',
  //     'bayessTrue': 0.063,
  //     'bayessFalse': 0.937,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 735,
  //     'countryName': 'China',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 736,
  //     'countryName': 'Colombia',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 737,
  //     'countryName': 'Comoros',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 738,
  //     'countryName': 'Costa Rica',
  //     'bayessTrue': 0.11909,
  //     'bayessFalse': 0.88091,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 739,
  //     'countryName': 'Croatia',
  //     'bayessTrue': 0.06773,
  //     'bayessFalse': 0.93227,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 740,
  //     'countryName': 'Cyprus',
  //     'bayessTrue': 0.06773,
  //     'bayessFalse': 0.93227,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }, {
  //     'id': 741,
  //     'countryName': 'Czech Republic',
  //     'bayessTrue': 0.063,
  //     'bayessFalse': 0.937,
  //     'nnTrue': 0.4,
  //     'nnFalse': 0.6
  //   }];

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

      objectJSON[i]['nuclear'] = (objectJSON[i]['nuclear'] === 0) ? false : true;
      objectJSON[i]['inWar'] = (objectJSON[i]['inWar'] === 0) ? false : true;

      delete objectJSON[i]['GDP_2012'];
      delete objectJSON[i]['GDP_2013'];
      delete objectJSON[i]['GDP_2014'];
      delete objectJSON[i]['GDP_2015'];
      delete objectJSON[i]['GDP_2016'];
    }

    console.log(objectJSON);
    this.getPredictedValuesFromExcel(objectJSON).subscribe(dt => this.result = dt);

  }

  ngOnInit() {
  }

}
