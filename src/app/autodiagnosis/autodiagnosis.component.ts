import { Component, OnInit, DoCheck } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-autodiagnosis',
  templateUrl: './autodiagnosis.component.html',
  styleUrls: ['./autodiagnosis.component.css']
})
export class AutodiagnosisComponent implements OnInit {

  avance: number = 0;

  name: string;
  phone: string;
  dni: number;
  bussines: string;
  result: string;
  typeResult: number;

  cuestionario: any = Array(27);

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

  pregunta1 = true;
  pregunta2 = true;
  pregunta3 = true;
  pregunta4 = true;

  constructor(
    private _router: Router,
    private _surveyService: SurveyService,
    private _snackBar: MatSnackBar
  ) { }

  ngDoCheck(): void {
    this.avance = 0;

    this.cuestionario.forEach((element, key) => {
      if(key == 3 || key == 13) {
        console.log('key', key)
        console.log('element', element)
        console.log('comparacion 1', key != 3)
        console.log('comparacion 2', key != 13)
      } else {
        if(element != "" && element != null) {
          this.avance += 4;
        }
      }
    });
  }

  ngOnInit(): void {
    
  }

  cambioPregunta1(event) {
    this.pregunta1 = !event.checked
  }

  cambioPregunta2(event) {
    this.pregunta2 = !event.checked
  }

  cambioPregunta3(event) {
    this.pregunta3 = !event.checked
  }

  cambioPregunta4(event) {
    this.pregunta4 = !event.checked
  }
  enviarResultado() {
    this.loader = true;
    this.cuestionario.forEach((element, key) => {

      if(key >= 0 && key <= 10) {
        if(this.result == "" || this.result == null) {
          if (element == "1") {
            this.result = this.respuestas[0].name;
            this.typeResult = this.respuestas[0].id;
          }
        }
      }

      if(key >= 11 && key <= 16) {
        if(this.result == "" || this.result == null) {
          if(element == "1") {
            this.result = this.respuestas[1].name;
            this.typeResult = this.respuestas[1].id;
          }
        }
      }

      if(key >= 17 && key <= 26) {
        if(this.result == "" || this.result == null) {
          if(element == "1") {
            this.result = this.respuestas[2].name;
            this.typeResult = this.respuestas[2].id;
          }
        }
      }

      if(this.result == null || this.result == "") {
        this.result = this.respuestas[3].name;
        this.typeResult = this.respuestas[3].id;
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
      type: "AUTODIAGNOSTICO",
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
