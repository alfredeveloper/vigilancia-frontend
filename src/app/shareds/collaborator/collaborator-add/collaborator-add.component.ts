import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Follow } from 'src/app/models/follow';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
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

  constructor(
    public dialogRef: MatDialogRef<CollaboratorAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { 
    this.patient = new Patient('','','','','','','','','',new Date(),'','');
    this.follow = new Follow(0,false,false,false,false,false,false,false,false,false,false,false,false,false,false,'','',false,false,false,null);
  }

  ngOnInit(): void {
  }

  registrarColaborador(f: NgForm): void {

    console.log('this.patient', this.patient);
    console.log('this.follow', this.follow);
    let json = this.extend(this.patient, this.follow);
    console.log('JSON', json);
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
