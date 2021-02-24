import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Follow } from 'src/app/models/follow';
import { Patient } from 'src/app/models/patient';
import { FollowService } from 'src/app/services/follow.service';
import { PatientService } from 'src/app/services/patient.service';
import { TypeDocumentService } from 'src/app/services/type-document.service';
import { SuccessComponent } from '../../dialog/success/success.component';

@Component({
  selector: 'app-follow-edit',
  templateUrl: './follow-edit.component.html',
  styleUrls: ['./follow-edit.component.css']
})
export class FollowEditComponent implements OnInit {

  follow: Follow;
  patient: Patient;

  tipos: any[] = [];
  
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowEditComponent>,
    private _followService: FollowService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _typeDocumentService: TypeDocumentService,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { 
    this.patient = new Patient('','','','','','','','','','','',new Date(),'','',null,null,null,'','');

    this.follow = new Follow(null, false, '', false,  false, '', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, '', false, false, false, false, false, false, false, '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('data', this.data)
    this.obtenerTiposDeDocumento();

  }

  obtenerTiposDeDocumento() {
    this._typeDocumentService.getTiposDeDocumentos().subscribe(
      response => {
        this.tipos = response.data;
        this.obtenerPaciente();
      },
      error => {
        this.openError('Error al obtener tipos de documento', 'OK');
      }
    )
  }

  obtenerPaciente() {
    this._patientService.getPatient(this.data.follow.patient).subscribe(
      response => {
        console.log('paciente', response);
        this.patient.type_document = response.data.type_document;
        this.patient.document = response.data.document;
        this.patient.name = response.data.name;
        this.patient.apaterno = response.data.apaterno;
        this.patient.amaterno = response.data.amaterno;
        this.patient.origin = response.data.origin;
        this.patient.birth_date = response.data.birth_date;
      },
      error => {
        console.log('error', error)
      }
    )
  }

  actualizarSeguimiento(f: NgForm) {

    console.log('DATA TO UPDATE', this.data);

    this._followService.updateFollow(this.data.follow._id, this.data.follow).subscribe(
      response => {
        console.log('RESPONSE', response);
        
        this._bottomSheetRef.dismiss();
      },
      error => {
        console.log('ERROR', error)
      }
    )
  }

  cancelar() {
    this._bottomSheetRef.dismiss();
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
