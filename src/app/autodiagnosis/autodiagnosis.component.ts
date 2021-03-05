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
  casoDescartado = false;

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
  enviarResultado(f: NgForm) {
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
    
    let result = "SIN RESULTADOS";
    let confirmation = "";
    
    if(esSospechoso && esProbable) {
      
      result = "SOSPECHOSO_PROBABLE";
      
    } else {
      if(esSospechoso) {
        result = "SOSPECHOSO";
        confirmation = "CONFIRMADO_SINTOMATICO";
      } 
      
      if(esProbable) {
        result = "PROBABLE";
        confirmation = "CONFIRMADO_ASINTOMATICO";
      }
    }

    if(this.casoDescartado) {
      confirmation = "DESCARTADO";
    }
    
    const resultados = {
      name: this.name,
      phone: this.phone,
      dni: this.dni,
      bussines: this.bussines,
      cuestionario: this.cuestionario,
      result: result,
      confirmation: confirmation
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

  seleccionar(value) {
    console.log('value', value)
    if(value == "1a") {
      if(this.pregunta1) {
        this.pregunta1 = !this.pregunta1;
        this.pregunta2 = true;
        this.pregunta3 = true;
        this.pregunta4 = true;

        this.casoSospechoso[8] = false;
        this.casoSospechoso[9] = false;
        this.casoSospechoso[10] = false;

        this.casoProbable[0] = false;
        this.casoProbable[1] = false;
        this.casoProbable[2] = false;
        this.casoProbable[3] = false;
        this.casoProbable[4] = false;
        this.casoProbable[5] = false;

        this.casoDescartado = false;
      }
    } else if(value =="1b") {
      if(this.pregunta2){
        this.pregunta1 = true;
        this.pregunta2 = !this.pregunta2;
        this.pregunta3 = true;
        this.pregunta4 = true;
        
        this.casoSospechoso[0] = false;
        this.casoSospechoso[1] = false;
        this.casoSospechoso[2] = false;
        this.casoSospechoso[3] = false;
        this.casoSospechoso[4] = false;
        this.casoSospechoso[5] = false;
        this.casoSospechoso[6] = false;
        this.casoSospechoso[7] = false;
        
        this.casoProbable[0] = false;
        this.casoProbable[1] = false;
        this.casoProbable[2] = false;
        this.casoProbable[3] = false;
        this.casoProbable[4] = false;
        this.casoProbable[5] = false;

        this.casoDescartado = false;
      }
    } else if(value =="2a") {
      if(this.pregunta3) {
        this.pregunta1 = true;
        this.pregunta2 = true;
        this.pregunta3 = !this.pregunta3;
        this.pregunta4 = true;

        this.casoSospechoso[0] = false;
        this.casoSospechoso[1] = false;
        this.casoSospechoso[2] = false;
        this.casoSospechoso[3] = false;
        this.casoSospechoso[4] = false;
        this.casoSospechoso[5] = false;
        this.casoSospechoso[6] = false;
        this.casoSospechoso[7] = false;
        this.casoSospechoso[8] = false;
        this.casoSospechoso[9] = false;
        this.casoSospechoso[10] = false;

        this.casoProbable[2] = false;
        this.casoProbable[3] = false;
        this.casoProbable[4] = false;
        this.casoProbable[5] = false;
        
        this.casoDescartado = false;
      }
    } else if(value =="2b") {
      if(this.pregunta4) {
        this.pregunta1 = true;
        this.pregunta2 = true;
        this.pregunta3 = true;
        this.pregunta4 = !this.pregunta4;

        this.casoSospechoso[0] = false;
        this.casoSospechoso[1] = false;
        this.casoSospechoso[2] = false;
        this.casoSospechoso[3] = false;
        this.casoSospechoso[4] = false;
        this.casoSospechoso[5] = false;
        this.casoSospechoso[6] = false;
        this.casoSospechoso[7] = false;
        this.casoSospechoso[8] = false;
        this.casoSospechoso[9] = false;
        this.casoSospechoso[10] = false;

        this.casoProbable[0] = false;
        this.casoProbable[1] = false;
        this.casoProbable[5] = false;
        
        this.casoDescartado = false;
      }
    } else if(value =="2c") {
      this.pregunta1 = true;
      this.pregunta2 = true;
      this.pregunta3 = true;
      this.pregunta4 = true;

      this.casoProbable[5] = true;

      this.casoSospechoso[0] = false;
      this.casoSospechoso[1] = false;
      this.casoSospechoso[2] = false;
      this.casoSospechoso[3] = false;
      this.casoSospechoso[4] = false;
      this.casoSospechoso[5] = false;
      this.casoSospechoso[6] = false;
      this.casoSospechoso[7] = false;
      this.casoSospechoso[8] = false;
      this.casoSospechoso[9] = false;
      this.casoSospechoso[10] = false;

      this.casoProbable[0] = false;
      this.casoProbable[1] = false;
      this.casoProbable[2] = false;
      this.casoProbable[3] = false;
      this.casoProbable[4] = false;
      
      this.casoDescartado = false;
    } else if(value == "3a") {

      this.pregunta1 = true;
      this.pregunta2 = true;
      this.pregunta3 = true;
      this.pregunta4 = true;

      this.casoDescartado = true;

      this.casoSospechoso[0] = false;
      this.casoSospechoso[1] = false;
      this.casoSospechoso[2] = false;
      this.casoSospechoso[3] = false;
      this.casoSospechoso[4] = false;
      this.casoSospechoso[5] = false;
      this.casoSospechoso[6] = false;
      this.casoSospechoso[7] = false;
      this.casoSospechoso[8] = false;
      this.casoSospechoso[9] = false;
      this.casoSospechoso[10] = false;

      this.casoProbable[0] = false;
      this.casoProbable[1] = false;
      this.casoProbable[2] = false;
      this.casoProbable[3] = false;
      this.casoProbable[4] = false;
      this.casoProbable[5] = false;
    }
    
  }

  openError(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
