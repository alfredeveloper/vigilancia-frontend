import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Follow } from 'src/app/models/follow';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { TypeDocumentService } from 'src/app/services/type-document.service';
import { SuccessComponent } from '../../dialog/success/success.component';

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return date.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@Component({
  selector: 'app-collaborator-add',
  templateUrl: './collaborator-add.component.html',
  styleUrls: ['./collaborator-add.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CollaboratorAddComponent implements OnInit {

  patient: Patient;
  follow: Follow;

  departamentos: Array<any> = [];
  provincias: Array<any> = [];
  distritos: Array<any> = [];

  tipos: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CollaboratorAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar,
    private _typeDocumentService: TypeDocumentService,
    public dialog: MatDialog
  ) { 
    this.patient = new Patient('','','','','','','','','','','',new Date(),'','',null,null,null,'','');
    this.follow = new Follow(null, false, '', false,  false, '', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, '', false, false, false, false, false, false, false, '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.listarDepartamentos();
    this.obtenerTiposDeDocumento();
  }

  obtenerTiposDeDocumento() {
    this._typeDocumentService.getTiposDeDocumentos().subscribe(
      response => {
        console.log('tipos', response)
        this.tipos = response.data;
      },
      error => {
        this.openError('Error al obtener tipos', 'OK')
      }
    )
  }

  registrarColaborador(f: NgForm): void {

    let json = this.extend(this.patient, this.follow);
    console.log('json', json);

    this._patientService.registerPatient(json).subscribe(
      response => {
        console.log('response', response);
        this.mostrarExitoDialog('NUEVO COLABORADOR REGISTRADO');
        this.dialogRef.close(true);
      },
      error => {
        console.log('error', error);
        this.openError('Error al registrar nueo colaborador', 'OK');

      }
    )

  }

  listarDepartamentos() {
    this._patientService.obtenerDepartamentos().subscribe(
      response => {
        this.departamentos = response.data;
      },
      error => {
        this.openError('Error al obtener departamentos', 'OK');
      }
    )
  }

  seleccionarDepartamento() {
    this._patientService.obtenerProvincias(this.patient.departamento).subscribe(
      response => {
        this.provincias = response.data;
      },
      error => { 
        this.openError('Error al obtener provincias', 'OK');
      }
    )
  }

  seleccionarProvincia() {
    this._patientService.obtenerDistritos(this.patient.provincia).subscribe(
      response => {
        this.distritos = response.data;
      },
      error => {
        this.openError('Error al obtener distritos', 'OK');
      }
    )
  }

  extend(dest, src) { 
    for(var key in src) { 
        dest[key] = src[key]; 
    } 
    return dest; 
  } 

  cancelar() {
    this.dialogRef.close();
  }

  openError(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  mostrarExitoDialog(message) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '300px',
      data: message
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Si', result)
      }
    })
  }

}
