import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  resultados: any;

  constructor() { }

  ngOnInit(): void {
    this.obtenerResultados();
  }

  obtenerResultados() {

    this.resultados = JSON.parse(localStorage.getItem('resultados'));

  }

}
