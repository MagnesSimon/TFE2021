import { Component, OnInit } from '@angular/core';
import {async, Subscription} from "rxjs";
import {PieceServices} from "../services/piece.services";


@Component({
  selector: 'app-liste-view',
  templateUrl: './liste-view.component.html',
  styleUrls: ['./liste-view.component.css']
})
export class ListeViewComponent implements OnInit {

  private piece : any[''];
  private pieceSubsciption: Subscription | undefined;

  constructor(private pieceServices: PieceServices) {
  }

  ngOnInit() {
    this.piece = this.pieceServices.getAllPiecesFromServer();
    // @ts-ignore
    console.log(this.piece) | async ;
  }

  onFetch(){
    this.pieceServices.getAllPiecesFromServer();
  }

}
