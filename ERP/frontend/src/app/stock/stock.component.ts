import {Component, Input, OnInit} from '@angular/core';
import {StockServices} from "../services/stock.services";
import {HttpClient} from "@angular/common/http";
import {VariableGlobale} from "../variableGlobale";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  get editable(): true {
    return this._editable;
  }

  set editable(value: true) {
    this._editable = value;
  }
  get ficheTechniqueVisible(): boolean {
    return this._ficheTechniqueVisible;
  }

  set ficheTechniqueVisible(value: boolean) {
    this._ficheTechniqueVisible = value;
  }

  get tableauVisible(): boolean {
    return this._tableauVisible;
  }

  set tableauVisible(value: boolean) {
    this._tableauVisible = value;
  }

  pieces = [{
    nom_famille: "",
    nom_categorie: "",
    reference:"",
    nom_finition:"",
    effet_finition:"",
    valeur_seuil:0,
    quantite_en_stock: 0
  }]

  private _tableauVisible = true;
  private _ficheTechniqueVisible = false;
  private stockSubject: any

  // @ts-ignore
  ficheForm : FormGroup;
  // @ts-ignore
  private _editable: true ;

  constructor( private stockServices: StockServices,
               private httpClient: HttpClient,
               private varGlo: VariableGlobale,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // @ts-ignore
    this.getStockFromServer();
    this.initForm();
  }

  getStockFromServer(){
    this.httpClient
      .get<any[]>(this.varGlo.url + '/stock')
      .subscribe(
        (response) => {
          this.pieces = response;
          this.emitStockSubject();
        },
        (error) => {
          console.log('Erreur de chargement' + error);
        }
      )
  }
  emitStockSubject(){
    this.stockSubject.next(this.pieces.slice());
  }

  afficherFicheTechnique() {
    this.tableauVisible = false;
    this.ficheTechniqueVisible = true;

  }

  private initForm() {
    this.ficheForm = this.formBuilder.group({
      nom_famille: "",
      nom_categorie: "",
      reference:"",
      nom_finition:"",
      effet_finition:"",
      valeur_seuil:0,
      quantite_en_stock: 0
    })
  }

  onSubmitForm() {

  }
}
