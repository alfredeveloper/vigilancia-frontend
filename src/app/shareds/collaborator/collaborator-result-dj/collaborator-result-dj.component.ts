import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborator-result-dj',
  templateUrl: './collaborator-result-dj.component.html',
  styleUrls: ['./collaborator-result-dj.component.css']
})
export class CollaboratorResultDjComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CollaboratorResultDjComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
