import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import {Globals} from '../globals';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginGuard } from './login.guard';
import { PalpitarrodadaComponent } from './palpitarrodada/palpitarrodada.component';

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "", component: PalpitarrodadaComponent },
  {path: "palpitarrodada", component: PalpitarrodadaComponent },
  {path: "palpitarrodada/:campeonato", component: PalpitarrodadaComponent },
  {path: "palpitarrodada/:campeonato/rodada/:rodada", component: PalpitarrodadaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PalpitarrodadaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
