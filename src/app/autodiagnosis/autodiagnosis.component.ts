import { Component, OnInit, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
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

  patient_id: any;

  cuestionario: any = Array(27);

  casoSospechoso: any [] = [false,false,false,false,false,false,false,false,false,false,false];
  casoProbable: any [] = [false,false,false,false,false,false];

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
    private _snackBar: MatSnackBar,
    private _patientService: PatientService
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

  buscarPaciente(f: NgForm) {
    this._patientService.buscarPorDocumento(this.dni).subscribe(
      response => {
        console.log('response', response)
        this.name = `${response.data.name} ${response.data.apaterno} ${response.data.amaterno}`;
        this.bussines = response.data.company;
        this.phone = response.data.telephone;

        this.patient_id = response.data._id;
      },
      error => {
        this.openError('Error al buscar', 'OK');
      }
    )
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
    console.log('sospechoso', this.casoSospechoso)
    console.log('probable', this.casoProbable)
    
    this.loader = false;
    
    let esSospechoso = false;
    
    this.casoSospechoso.forEach(element => {
      if(element) {
        esSospechoso = true;
      }
    });
    
    let esProbable = false;
    
    this.casoProbable.forEach(element => {
      if(element) {
        esProbable = true;
      }
    });
    
    let result = "NINGUNO";
    
    if(esSospechoso && esProbable) {
      
      result = "SOSPECHOSO_PROBABLE";
      
    } else {
      if(esSospechoso) {
        result = "SOSPECHOSO";
      } 
      
      if(esProbable) {
        result = "PROBABLE";
      }
    }
    
    const resultados = {
      name: this.name,
      phone: this.phone,
      dni: this.dni,
      bussines: this.bussines,
      cuestionario: this.cuestionario,
      result: result
    }
    
    console.log('resultados', resultados);
    
    let params = {
      type: "AUTODIAGNOSTICO",
      result: result,
      patient: this.patient_id,
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
