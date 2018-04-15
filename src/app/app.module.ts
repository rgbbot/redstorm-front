import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollToModule } from 'ng2-scroll-to-el';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FileLoaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
