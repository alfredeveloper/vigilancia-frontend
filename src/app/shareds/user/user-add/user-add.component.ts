import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User;

  constructor(
    public dialogRef: MatDialogRef<UserAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) { 

    this.user = new User('','','','','',true,'');

  }

  ngOnInit(): void {
  }

  registrarUsuario(f: NgForm): void {

    this._userService.registerUser(this.user).subscribe(
      response => {
        f.resetForm();
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(false);
      }
    );

  }

  cancelar(): void {

    this.dialogRef.close();

  }
}
