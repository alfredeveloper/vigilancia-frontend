import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from 'src/app/services/patient.service';
import { TypeDocumentService } from 'src/app/services/type-document.service';
import { SuccessComponent } from '../../dialog/success/success.component';

@Component({
  selector: 'app-collaborator-edit',
  templateUrl: './collaborator-edit.component.html',
  styleUrls: ['./collaborator-edit.component.css']
})
export class CollaboratorEditComponent implements OnInit {

  departamentos: Array<any> = [];
  provincias: Array<any> = [];
  distritos: Array<any> = [];

  tipos: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CollaboratorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar,
    private _typeDocumentService: TypeDocumentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerTiposDeDocumento();
    this.obtenerColaborador();
    this.listarDepartamentos();
    this.seleccionarDepartamento();
    this.seleccionarProvincia();
  }

  obtenerTiposDeDocumento() {
    this._typeDocumentService.getTiposDeDocumentos().subscribe(
      response => {
        this.tipos = response.data;
      },
      error => {
        this.openError('Error al obtener tipos', 'OK')
      }
    )
  }

  obtenerColaborador() {
    this._patientService.getPatient(this.data._id).subscribe(
      response => {
        console.log('response', response)
      },
      error => {
        this.openError('Error al obtener colaborador', 'OK');
      }
    )
  }

  actualizarColaborador(f: NgForm): void {
    this._patientService.updatePatient(this.data._id, this.data).subscribe(
      response => {
        console.log('RESPONSE R', response);
        this.mostrarExitoDialog('COLABORADOR ACTUALIZADO');
        this.dialogRef.close(true);
      }, 
      error => {
        console.log('ERROR E', error);
        this.openError('Error al actualizar colaborador', 'OK');
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
    this._patientService.obtenerProvincias(this.data.departamento).subscribe(
      response => {
        this.provincias = response.data;
      },
      error => { 
        this.openError('Error al obtener provincias', 'OK');
      }
    )
  }

  seleccionarProvincia() {
    this._patientService.obtenerDistritos(this.data.provincia).subscribe(
      response => {
        this.distritos = response.data;
      },
      error => {
        this.openError('Error al obtener distritos', 'OK');
      }
    )
  }

  cancelar(): void {
    this.dialogRef.close(false);
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
