import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service';
import { SurveyService } from 'src/app/services/survey.service';
import { SuccessComponent } from 'src/app/shareds/dialog/success/success.component';
import { ResultDetailComponent } from 'src/app/shareds/survey/result-detail/result-detail.component';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.css']
})
export class DeclarationsComponent implements OnInit {

  displayedColumnsCol: string[] = ['persona', 'telefono', 'empresa', 'diagnostico', 'action'];
  dataSourceCol: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginatorCol: MatPaginator;
  @ViewChild(MatSort, {static: true}) sortCol: MatSort;

  patients: any;

  declaraciones: any = [];

  tipos = [
    {
      name: "Presenta síntomas relacionados al COVID-19, por prevención quédate en casa y el personal de salud se comunicará contigo prontamente",
      id: 1
    },
    
    {
      name: "No presenta ningún síntoma relacionado al COVID-19, ni factores de riesgo",
      id: 4
    }
  ]

  constructor(
    private _surveyService: SurveyService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 
    this.dataSourceCol = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.obtenerDeclaraciones();
  }

  obtenerDeclaraciones() {
    this._surveyService.getSwornDeclarations().subscribe(
      response => {
        console.log('DECLARACIONES JURADAS', response)
        this.dataSourceCol = new MatTableDataSource(response.data);
        this.dataSourceCol.paginator = this.paginatorCol;
        this.dataSourceCol.sort = this.sortCol;
        this.declaraciones = response.data;
      },
      error => {
        this.openError('No se logro obtener las declaraciones juradas', 'OK');
        console.log('ERROR', error)
      }

    )
  }

  verRespuestas(data): void {

    const dialogRef = this.dialog.open(ResultDetailComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  seleccionarTipoResultado(valor): void {
    console.log('valor', valor);
    if(valor == 0) {
      
      this.dataSourceCol = new MatTableDataSource(this.declaraciones);
      this.dataSourceCol.paginator = this.paginatorCol;
      this.dataSourceCol.sort = this.sortCol;
    } else {
      let declaraciones = [];

      for (let index = 0; index < this.declaraciones.length; index++) {
        const element = this.declaraciones[index];
        
        if(element.typeResult == valor) {
          declaraciones.push(element);
        }
        
      }
      
      this.dataSourceCol = new MatTableDataSource(declaraciones);
      this.dataSourceCol.paginator = this.paginatorCol;
      this.dataSourceCol.sort = this.sortCol;
    }

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
