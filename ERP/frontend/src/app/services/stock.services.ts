import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {VariableGlobale} from "../variableGlobale";

@Injectable()
export class StockServices{

  stockSubject = new Subject<any[]>();

  stock = [{
    reference: undefined
  }];
  constructor(private httpClient: HttpClient,
              private varGlo: VariableGlobale) {
  }

  emitStockSubject(){
    this.stockSubject.next(this.stock.slice());
  }

  getAppareilByRef(ref: string){
    const piece = this.stock.find(
      (stockObject) =>{
        return stockObject.reference === ref;
      }
    );
    return piece;
  }
/*
  addPiece(name: string, status: string){
    const piece = {
      reference: 0,
      //name: '',
      //status: ''
    };
    //appareilObject.name = name;
    //appareilObject.status = status;
    //piece.reference = "nouvelle reference en input";
    //this.appareils.push(appareilObject);
    //this.emitAppareilSubject();
  }
 */

  saveStockToServer(){
    this.httpClient
      .put(this.varGlo.url + '/URL A METTRE', this.stock)
      .subscribe(
        () => {
          console.log('Enregistrement terminé');
        },
        (error) => {
          console.log('Erreur de sauvegarde' + error);
        }
      )
  }

  getStockFromServer(){
    this.httpClient
      .get<any[]>(this.varGlo.url + '/stock')
      .subscribe(
        (response) => {
          this.stock = response;
          this.emitStockSubject();

          console.log(this.stock);
        },
        (error) => {
          console.log('Erreur de chargement' + error);
        }
      )
  }
}
