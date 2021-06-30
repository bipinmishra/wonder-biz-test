import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app-routing/app-routing.module'
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {HomeComponent} from './component/home/home.component'
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RestService } from './services/rest.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
