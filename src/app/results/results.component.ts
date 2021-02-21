import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  resultados: any;
  loader: boolean = true;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerResultados();
    
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  obtenerResultados() {

    this.resultados = JSON.parse(localStorage.getItem('resultados'));

  }

  volver() {
    this._router.navigate(['/autodiagnostico']);
  }

}
