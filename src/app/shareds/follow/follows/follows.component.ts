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
import { FollowAddComponent } from '../follow-add/follow-add.component';
import { FollowEditComponent } from '../follow-edit/follow-edit.component';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {

  follow: Follow;

  displayedColumns: string[] = ['temperatura', 'escalofrios', 'tos', 'dolor_garganta', 'dolor_pecho', 'date', 'accion'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    public dialogRef: MatDialogRef<FollowsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _followService: FollowService,
    private _bottomSheet: MatBottomSheet
  ) { 
    this.follow = new Follow(null, false, '', false,  false, '', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, '', false, false, false, false, false, false, false, '', '', '', '', '', '', '', '', '');
  } 

  ngOnInit(): void {
    this.obtenerSeguimientos();
    console.log('DATA E', this.data)
  }

  obtenerSeguimientos() {
    this._followService.getFollowsByPatient(this.data._id).subscribe(
      response => {
        console.log('RESPONSE FOLLOW BY PATIENT', response)
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('ERROR FOLLOW BY PATIENT', error)
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
