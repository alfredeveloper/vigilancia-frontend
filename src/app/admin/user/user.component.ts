import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ErrorComponent } from 'src/app/shareds/dialog/error/error.component';
import { SuccessComponent } from 'src/app/shareds/dialog/success/success.component';
import { ConfirmationComponent } from 'src/app/shareds/dialog/confirmation/confirmation.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { UserAddComponent } from 'src/app/shareds/user/user-add/user-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEditComponent } from 'src/app/shareds/user/user-edit/user-edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumnsAdmin: string[] = ['nombres', 'apellidos', 'correo', 'rol', 'activo', 'accion'];
  dataSourceAdmin: MatTableDataSource<any>;

  selectionAdmin = new SelectionModel<any>(true, []);
  
  @ViewChild(MatPaginator, {static: true}) paginatorAdmin: MatPaginator;
  @ViewChild(MatSort, {static: true}) sortAdmin: MatSort;

  user: User = new User('', '', '', '', '', false, '');
  users: any;

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { 
    // Assign the data to the data source for the table to render
    this.dataSourceAdmin = new MatTableDataSource([]);
    this.dataSourceAdmin.paginator = this.paginatorAdmin;
    this.dataSourceAdmin.sort = this.sortAdmin;
    // console.log('DATASOURCE', this.dataSource)
  }

  ngOnInit() {
    this.obtenerAdministradores();
  }

  agregarAdministrador() {

    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '300px',
      data: {},
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.obtenerAdministradores();
        console.log('Si', result)
      } else {

      }
    })

  }

  editarAdministrador(id) {

    this._userService.getUser(id).subscribe(
      response => {
        const dialogRef = this.dialog.open(UserEditComponent, {
          width: '300px',
          data: response.data,
          disableClose: true
        })
    
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            this.obtenerAdministradores();
            console.log('Si', result)
          }
        })
      },
      error => {
        this.openError('Error al obtener usuario', 'OK');
      }
    )


  }


  obtenerAdministradores() {

    this._userService.getUsers().subscribe(
      response => {
        console.log('RESPONSE', response)
        this.dataSourceAdmin = new MatTableDataSource(response.data);
        this.dataSourceAdmin.paginator = this.paginatorAdmin;
        this.dataSourceAdmin.sort = this.sortAdmin;
        this.users = response.data;
      },
      error => {
        console.log('error', error);
      } 
    )

  }

  cambiarActivacionAdministrador(id, active) {
    let message = "";
    message = (active)? '¿Desea inactivar este administrador?': '¿Desea activar este administrador?'
    
    console.log('DESICION', !active)
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '300px',
      data: message,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true') {
        this._userService.updateUser(id, {active: true}).subscribe(
          response => {
            console.log('RESPONSE UPDATE', response)
            this.obtenerAdministradores();
          },
          error => {
            console.log('error', error);
          }
        )

      } else {
        this.obtenerAdministradores();
      }
    })
  }

  applyFilterAdmin(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAdmin.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAdmin.paginator) {
      this.dataSourceAdmin.paginator.firstPage();
    }
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
