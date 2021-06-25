import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListeViewComponent } from './liste-view/liste-view.component';
import {RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { AutentificationComponent } from './autentification/autentification.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DroitsComponent } from './droits/droits.component';
import { PenurieComponent } from './penurie/penurie.component';

const appRoutes: Routes = [
  {path: 'liste' , component : ListeViewComponent},
  {path: 'autentification', component : AutentificationComponent},
  {path: 'penurie', component : PenurieComponent},
  {path: 'historique', component : HistoriqueComponent},
  {path: 'droits', component : DroitsComponent},
  {path: '', component : ListeViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ListeViewComponent,
    HeaderComponent,
    AutentificationComponent,
    HistoriqueComponent,
    DroitsComponent,
    PenurieComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
