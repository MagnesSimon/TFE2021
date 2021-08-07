import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { AutentificationComponent } from './autentification/autentification.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DroitsComponent } from './droits/droits.component';
import { PenurieComponent } from './penurie/penurie.component';
import {HttpClientModule} from "@angular/common/http";
import {VariableGlobale} from "./variableGlobale";
import {FormsModule} from "@angular/forms";
import { StockComponent } from './stock/stock.component';
import {StockServices} from "./services/stock.services";

const appRoutes: Routes = [
  {path: 'stock' , component: StockComponent },
  {path: 'autentification', component : AutentificationComponent},
  {path: 'penurie', component : PenurieComponent},
  {path: 'historique', component : HistoriqueComponent},
  {path: 'droits', component : DroitsComponent},
  {path: '', component: StockComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AutentificationComponent,
    HistoriqueComponent,
    DroitsComponent,
    PenurieComponent,
    StockComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    VariableGlobale,
    StockServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
