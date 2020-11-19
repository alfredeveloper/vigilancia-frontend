import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from 'src/app/services/patient.service';
import { SuccessComponent } from '../../dialog/success/success.component';

@Component({
  selector: 'app-collaborator-edit',
  templateUrl: './collaborator-edit.component.html',
  styleUrls: ['./collaborator-edit.component.css']
})
export class CollaboratorEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CollaboratorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
