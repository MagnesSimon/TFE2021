import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  appareils = [
    {
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      name: 'Frigo',
      status: 'allumé'
    },
    {
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  @Input() appareilName: string | undefined;
  @Input() appareilStatus: string | undefined;


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

    @Input() reference: string | undefined;
    @Input() quantite_en_stock: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
