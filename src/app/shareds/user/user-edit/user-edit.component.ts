import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  actualizarUsuario(f: NgForm): void {

    this._userService.updateUser(this.data._id, this.data).subscribe(
      response => {
        console.log('RESPONSE', response)
        this.dialogRef.close(true);
      },
      error => {
        console.log('ERROR', error)
        this.dialogRef.close(false);
      }
    )

  }

  cancelar(): void {

    this.dialogRef.close();

  }

}
