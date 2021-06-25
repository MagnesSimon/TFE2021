import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class PieceServices {

  piecesSubject = new Subject<any[]>();
  private pieces = [{}];
  private http: 'http://localhost:3001/' | undefined;

  constructor(private httpClient: HttpClient) {

  }

  emitPieceSubject(){
    this.piecesSubject.next(this.pieces.slice());
  }

  getAllPiecesFromServer(){
    this.httpClient.get<any>('http://localhost:3001/pieces')
  .subscribe(
    (response) =>{
      this.pieces = response;
      console.log(this.pieces);
      this.emitPieceSubject();
      return this.pieces;
    },
    (error) => {
      console.log('ERREUR récupération des pièces' + error);
    }
  )}
}


