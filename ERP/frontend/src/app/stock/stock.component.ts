import {Component, Input, OnInit} from '@angular/core';
import {StockServices} from "../services/stock.services";
import {HttpClient} from "@angular/common/http";
import {VariableGlobale} from "../variableGlobale";
import {Subject} from "rxjs";


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
/*
    pieces = [{
      reference: "TE4200",
      valeur_seuil:5,
      quantite_en_stock:10,
      id_famille:1,
      id_categorie:7,
      id_finition:1
    },
      {
        reference:"MN4600",
        valeur_seuil:5,
        quantite_en_stock:12,
        id_famille:2,
        id_categorie:9,
        id_finition:1
      },
      {
        reference:"TE57",
        valeur_seuil:0,
        quantite_en_stock:0,
        id_famille:1,
        id_categorie:13,
        id_finition:1
      }
    ];
     */
    pieces = [{
      nom_famille: "",
      nom_categorie: "",
      reference:"",
      nom_finition:"",
      effet_finition:"",
      valeur_seuil:0,
      quantite_en_stock: 0
    }]

  stockSubject = new Subject<any[]>();

  //pieces: [{}] | undefined;

    @Input() reference: string | undefined;
    @Input() quantite_en_stock: number | undefined;

  constructor( private stockServices: StockServices,
               private httpClient: HttpClient,
               private varGlo: VariableGlobale) { }

  ngOnInit(): void {
    // @ts-ignore
    this.getStockFromServer();
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

}
