import { Component, OnInit, DoCheck } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-sworn-declaration',
  templateUrl: './sworn-declaration.component.html',
  styleUrls: ['./sworn-declaration.component.css']
})
export class SwornDeclarationComponent implements OnInit {

  avance: number = 0;

  name: string;
  phone: string;
  dni: number;
  bussines: string;
  
  result: string;
  typeResult: number;

  cuestionario: any = new Array(10);

  loader: boolean = false;

  respuestas = [
    {
      name: "Presenta síntomas relacionados al COVID-19, por prevención quédate en casa y el personal de salud se comunicará contigo prontamente",
      id: 1
    },
    {
      name: "Por prevención deberás quedarte en casa y el personal de salud se comunicará contigo prontamente.",
      id: 2
    },
    {
      name: "No presenta ningún síntoma relacionado al COVID-19, pero si factores de riesgo, el personal de salud se comunicará contigo para poder brindarte mayor detalle.",
      id: 3
    },
    {
      name: "No presenta ningún síntoma relacionado al COVID-19, ni factores de riesgo",
      id: 4
    }
  ];

  constructor(
    private _router: Router,
    private _surveyService: SurveyService,
    private _snackBar: MatSnackBar
  ) { }

  ngDoCheck(): void {
    this.avance = 0;
    
    this.cuestionario.forEach((element, key) => {
      if(key == 0 || key == 1) {

      } else {
        if(element != "" && element != null) {
          this.avance += 12.5;
        }
      }
    });
  }

  ngOnInit(): void {
  }

  enviarResultado() {

    this.loader = true;

    this.cuestionario.forEach((element, key) => {
      console.log(`indice: `, key)
      console.log(`elemento: `, element)
      console.log('comparacion', element == '1');

      if(key != 9) {
        if (element == "1") {
          this.result = this.respuestas[0].name;
          this.typeResult = this.respuestas[0].id;
        }
        
        if(this.result == null || this.result == "") {
          this.result = this.respuestas[3].name;
          this.typeResult = this.respuestas[3].id;
        }
      }
    });

    const resultados = {
      name: this.name,
      phone: this.phone,
      dni: this.dni,
      bussines: this.bussines,
      cuestionario: this.cuestionario,
      result: this.result
    }

    console.log('resultados', resultados);

    let params = {
      type: "DECLARACION_JURADA",
      name: this.name,
      diagnosis: this.result,
      phone: this.phone,
      dni: this.dni,
      company: this.bussines,
      typeResult: this.typeResult,
      results: JSON.stringify({cuestionario: this.cuestionario})
    }

    console.log('params', params)

    this._surveyService.saveAutodiagnoses(params).subscribe(
      response => {
        this.loader = false;
        localStorage.setItem('resultados', JSON.stringify(resultados));
        
        this._router.navigate(['/resultados']);
        
      },
      error => {
        this.loader = false;
        this.openError('Error al registrar autodiagnóstico', 'OK');
      }
    )

  }

  openError(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
