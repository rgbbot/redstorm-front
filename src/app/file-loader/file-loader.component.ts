import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.sass']
})
export class FileLoaderComponent implements OnInit {

  public file: any;
  public name: string;
  public loaded = false;

  constructor() {
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

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.file = reader.result;
    this.loaded = true;
  }

  ngOnInit() {
  }

}
