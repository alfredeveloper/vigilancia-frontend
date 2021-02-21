import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { CollaboratorAddComponent } from 'src/app/shareds/collaborator/collaborator-add/collaborator-add.component';
import { CollaboratorEditComponent } from 'src/app/shareds/collaborator/collaborator-edit/collaborator-edit.component';
import { CollaboratorResultComponent } from 'src/app/shareds/collaborator/collaborator-result/collaborator-result.component';
import { SuccessComponent } from 'src/app/shareds/dialog/success/success.component';
import { FollowsComponent } from 'src/app/shareds/follow/follows/follows.component';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {

  displayedColumnsCol: string[] = ['dni', 'nombres', 'apellidos', 'procedencia', 'control', 'action'];
  dataSourceCol: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginatorCol: MatPaginator;
  @ViewChild(MatSort, {static: true}) sortCol: MatSort;

  patient: Patient = new Patient('','','','','','','','','','','',new Date(),'','',null,null,null,'','');
  patients: any;

  constructor(
    private _patientService: PatientService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 
    this.dataSourceCol = new MatTableDataSource([]);

  }

  ngOnInit(): void {
    this.obtenerColaboradores();
  }

  obtenerColaboradores() {

    this._patientService.getPatients().subscribe(
      response => {
        console.log('COLABORADOR', response.data)
        this.dataSourceCol = new MatTableDataSource(response.data);
        this.dataSourceCol.paginator = this.paginatorCol;
        this.dataSourceCol.sort = this.sortCol;

        this.patients = response.data;
      },
      error => {
        this.openError('Error al encontrar colaboradores', 'Ok');
      }
    )

  }

  agregarColaborador() {
    const dialogRef = this.dialog.open(CollaboratorAddComponent, {
      width: '900px',
      data: {},
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerColaboradores();
      }
    })

  }

  editarColaborador(patient) {
    const dialogRef = this.dialog.open(CollaboratorEditComponent, {
      width: '800px',
      data: patient,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Si', result)
        this.obtenerColaboradores();
      }
    })

  }

  verSeguimientos(colaborador) {
    const dialogRef = this.dialog.open(FollowsComponent, {
      width: '700px',
      data: colaborador,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Si', result)
      }
    })
  }

  verResultadosAuto(colaborador) {
    const dialogRef = this.dialog.open(CollaboratorResultComponent, {
      width: '300px',
      data: colaborador,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Si', result)
      }
    })
  }

  verResultadosDec(colaborador) {
    const dialogRef = this.dialog.open(CollaboratorResultComponent, {
      width: '300px',
      data: colaborador,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Si', result)
      }
    })
  }

  applyFilterCol(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCol.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCol.paginator) {
      this.dataSourceCol.paginator.firstPage();
    }
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

  openError(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
