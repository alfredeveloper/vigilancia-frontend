import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Follow } from 'src/app/models/follow';
import { FollowService } from 'src/app/services/follow.service';
import { TypeDocumentService } from 'src/app/services/type-document.service';
import { FollowAddComponent } from '../follow-add/follow-add.component';
import { FollowEditComponent } from '../follow-edit/follow-edit.component';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {

  follow: Follow;
  isVertically = false;

  displayedColumns: string[] = [];
  columnasFijas: any[] = [];

  dataSource: MatTableDataSource<any>;

  displayedColumnsVer: string[] = ['fecha', 'pa','fc','fr','temperatura','pulsioximetria','tos','dolor_garganta','congestion_nasal','fiebre','malestar_general','dificultad_respiratoria','diarrea','nausea','cefalea','irritabilidad','dolor_muscular','dolor_abdominal','dolor_pecho','dolor_articulaciones','disnea','taquipnea','saturacion_oxigeno','alteracion_conciencia','fosfato_cloriquina','hidorxicloroquina','azitrocina','antibiotico','antiviral','especificar_medicamento','estado','action'];
  dataSourceVer: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  tipos = [];
  tipo = "";
  documento = "";
  nombres = "";
  apellidos = "";

  constructor(
    public dialogRef: MatDialogRef<FollowsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _followService: FollowService,
    private _typeService: TypeDocumentService,
    private _bottomSheet: MatBottomSheet
  ) { 
    this.follow = new Follow(null, false, '', false,  false, '', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, '', false, false, false, false, false, false, false, '', '', '', '', '', '', '', '', '', new Date(),'', null);
  } 

  ngOnInit(): void {
    this.obtenerSeguimientos();
    this.obtenerTiposDeDocumento();
    console.log('DATA E', this.data)
  }

  seleccionarColumna(index) {

    if(index > 0) {
      this.editarSeguimiento(this.columnasFijas[index]);
    }
    console.log('columna', this.columnasFijas[index])

  }

  obtenerSeguimientos() {
    this._followService.getFollowsByPatient(this.data._id).subscribe(
      response => {
        console.log('RESPONSE FOLLOW BY PATIENT', response)

        this.dataSource = new MatTableDataSource(response.data2);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSourceVer = new MatTableDataSource(response.data);

        this.columnasFijas = response.headers;
        this.displayedColumns = [];
        for (let index = 0; index < response.headers.length; index++) {
          const element = response.headers[index];
          
          
          this.displayedColumns.push(element.created_at);
        }

        this.tipo = response.patient.type_document;
        this.documento = response.patient.document;
        this.nombres = response.patient.name;
        this.apellidos = `${response.patient.apaterno} ${response.patient.amaterno}`;
      },
      error => {
        console.log('ERROR FOLLOW BY PATIENT', error)
      }
    )
  }

  obtenerTiposDeDocumento() {
    this._typeService.getTiposDeDocumentos().subscribe(
      response => {
        this.tipos = response.data;
      }, 
      error => {
        
      }
    )
  }

  agregarSeguimiento(): void {
    const sheetRef = this._bottomSheet.open(FollowAddComponent, {
      panelClass: 'width-bottom-sheet',
      data: {patient_id: this.data._id}
    });

    sheetRef.afterDismissed().subscribe(result => {
      this.obtenerSeguimientos();
    });
  }

  editarSeguimiento(follow) {
    const sheetRef = this._bottomSheet.open(FollowEditComponent, {
      panelClass: 'width-bottom-sheet',
      data: {follow}
    });

    sheetRef.afterDismissed().subscribe(result => {
      this.obtenerSeguimientos();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
